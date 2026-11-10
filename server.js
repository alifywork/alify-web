"use strict";

const http = require("node:http");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const Busboy = require("busboy");

const root = __dirname;
const storageRoot = path.join(root, "storage", "inquiries");
const port = Number(process.env.PORT || 8000);
const host = process.env.HOST || "0.0.0.0";
const maxRequestBytes = 16 * 1024 * 1024;
const allowedExtensions = new Set([".pdf", ".png", ".jpg", ".jpeg", ".doc", ".docx", ".txt"]);
const rateLimit = new Map();
const mimeTypes = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif", ".woff": "font/woff", ".woff2": "font/woff2",
  ".ttf": "font/ttf", ".ico": "image/x-icon", ".md": "text/plain; charset=utf-8",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8"
};

function json(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  response.end(JSON.stringify(payload));
}

function clean(value, max = 5000) {
  return String(value || "").trim().replace(/\0/g, "").slice(0, max);
}

async function parseInquiry(request) {
  return new Promise((resolve, reject) => {
    const fields = {};
    const files = [];
    let fileError = null;
    const parser = Busboy({ headers: request.headers, limits: { fileSize: 5 * 1024 * 1024, files: 3, fields: 40, parts: 45 } });
    parser.on("field", (name, value, info) => {
      if (info.valueTruncated) return;
      if (fields[name] === undefined) fields[name] = clean(value);
      else if (Array.isArray(fields[name])) fields[name].push(clean(value));
      else fields[name] = [fields[name], clean(value)];
    });
    parser.on("file", (name, stream, info) => {
      if (!info.filename) { stream.resume(); return; }
      const extension = path.extname(info.filename).toLowerCase();
      const safeBase = path.basename(info.filename, extension).replace(/[^a-z0-9_-]/gi, "-").slice(0, 60) || "brief";
      const storedName = `${crypto.randomUUID()}-${safeBase}${extension}`;
      const destination = path.join(storageRoot, storedName);
      if (!allowedExtensions.has(extension)) {
        fileError = "Only PDF, DOC, DOCX, TXT, PNG, and JPG briefs are accepted.";
        stream.resume();
        return;
      }
      const output = fs.createWriteStream(destination, { flags: "wx" });
      let bytes = 0;
      stream.on("data", (chunk) => { bytes += chunk.length; });
      stream.on("limit", () => { fileError = "Each attachment must be 5 MB or smaller."; output.destroy(); });
      stream.pipe(output);
      output.on("close", () => {
        if (bytes && !fileError) files.push({ field: name, originalName: path.basename(info.filename).slice(0, 180), storedName, bytes });
        else fsp.unlink(destination).catch(() => {});
      });
      output.on("error", reject);
    });
    parser.on("filesLimit", () => { fileError = "You can attach up to three files."; });
    parser.on("error", reject);
    parser.on("close", () => fileError ? reject(new Error(fileError)) : resolve({ fields, files }));
    request.pipe(parser);
  });
}

async function handleInquiry(request, response) {
  const contentLength = Number(request.headers["content-length"] || 0);
  if (contentLength > maxRequestBytes) return json(response, 413, { ok: false, message: "The inquiry is too large. Attachments must total less than 16 MB." });
  if (!/^multipart\/form-data;/i.test(request.headers["content-type"] || "")) return json(response, 415, { ok: false, message: "Use the website form to submit your inquiry." });
  const origin = request.headers.origin;
  if (origin) {
    try { if (new URL(origin).host !== request.headers.host) return json(response, 403, { ok: false, message: "Cross-origin submissions are not accepted." }); }
    catch { return json(response, 403, { ok: false, message: "Invalid request origin." }); }
  }
  const ip = request.socket.remoteAddress || "unknown";
  const now = Date.now();
  const attempts = (rateLimit.get(ip) || []).filter((time) => now - time < 60 * 60 * 1000);
  if (attempts.length >= 8) return json(response, 429, { ok: false, message: "Too many inquiries from this connection. Please try again later." });
  attempts.push(now); rateLimit.set(ip, attempts);
  try {
    const { fields, files } = await parseInquiry(request);
    if (fields.website) return json(response, 200, { ok: true, reference: "ALF-RECEIVED", message: "Thank you. Your inquiry has been received." });
    const email = clean(fields.email, 180);
    const name = clean(fields.name, 120);
    const brief = clean(fields.message || fields.goals || fields.brief, 8000);
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || brief.length < 5 || fields.privacyConsent !== "Accepted") {
      return json(response, 422, { ok: false, message: "Please provide your name, a valid email, project details, and privacy consent." });
    }
    const reference = `ALF-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const record = { reference, receivedAt: new Date().toISOString(), status: "new", name, email, fields, attachments: files };
    await fsp.writeFile(path.join(storageRoot, `${reference}.json`), JSON.stringify(record, null, 2), { flag: "wx" });
    return json(response, 201, { ok: true, reference, message: "Your inquiry is saved. Our team will respond using your supplied email." });
  } catch (error) {
    console.error("Inquiry error:", error.message);
    return json(response, 400, { ok: false, message: error.message || "We could not save your inquiry. Please try again." });
  }
}

async function serveStatic(request, response, pathname) {
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { response.writeHead(400); return response.end("Bad request"); }
  if (decoded.includes("\0") || decoded.startsWith("/storage/") || decoded.startsWith("/node_modules/") || decoded.startsWith("/.git/")) { response.writeHead(404); return response.end("Not found"); }
  const relative = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
  let file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep)) { response.writeHead(403); return response.end("Forbidden"); }
  try {
    const stat = await fsp.stat(file);
    if (stat.isDirectory()) { file = path.join(file, "index.html"); }
    const finalStat = await fsp.stat(file);
    if (!finalStat.isFile()) throw new Error("Not a file");
    const extension = path.extname(file).toLowerCase();
    const etag = `"${finalStat.size.toString(16)}-${Math.floor(finalStat.mtimeMs).toString(16)}"`;
    const headers = {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "Content-Length": finalStat.size,
      "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=3600, must-revalidate",
      "ETag": etag,
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
    };
    if (request.headers["if-none-match"] === etag) {
      response.writeHead(304, headers);
      return response.end();
    }
    response.writeHead(200, headers);
    if (request.method === "HEAD") return response.end();
    fs.createReadStream(file).pipe(response);
  } catch {
    const notFound = path.join(root, "404.html");
    try {
      const stat = await fsp.stat(notFound);
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Content-Length": stat.size, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
      if (request.method === "HEAD") return response.end();
      fs.createReadStream(notFound).pipe(response);
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
      response.end("Page not found — ALIFY");
    }
  }
}

fsp.mkdir(storageRoot, { recursive: true }).then(() => {
  http.createServer(async (request, response) => {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    if (url.pathname === "/api/health" && request.method === "GET") return json(response, 200, { ok: true, service: "ALIFY inquiry backend" });
    if (url.pathname === "/api/inquiries") {
      if (request.method !== "POST") return json(response, 405, { ok: false, message: "Method not allowed." });
      return handleInquiry(request, response);
    }
    if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405); return response.end("Method not allowed"); }
    return serveStatic(request, response, url.pathname);
  }).listen(port, host, () => console.log(`ALIFY website and inquiry API listening on http://${host}:${port}`));
}).catch((error) => { console.error(error); process.exit(1); });
