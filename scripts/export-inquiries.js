"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const source = path.join(root, "storage", "inquiries");
const destination = path.join(root, "storage", "exports");
const headers = ["reference", "receivedAt", "status", "name", "email", "company", "service", "budget", "timeline", "brief", "attachments", "fieldsJSON"];

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

async function exportInquiries() {
  const files = (await fs.readdir(source)).filter((file) => /^ALF-.*\.json$/i.test(file));
  const records = await Promise.all(files.map(async (file) => JSON.parse(await fs.readFile(path.join(source, file), "utf8"))));
  records.sort((a, b) => String(b.receivedAt).localeCompare(String(a.receivedAt)));
  const rows = records.map((record) => {
    const fields = record.fields || {};
    const brief = fields.message || fields.goals || fields.brief || "";
    const attachments = (record.attachments || []).map((file) => file.originalName).join(" | ");
    return [record.reference, record.receivedAt, record.status, record.name, record.email, fields.company, fields.service, fields.budget, fields.timeline, brief, attachments, JSON.stringify(fields)];
  });
  await fs.mkdir(destination, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const output = path.join(destination, `alify-inquiries-${stamp}.csv`);
  const csv = "\uFEFF" + [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
  await fs.writeFile(output, csv, { encoding: "utf8", flag: "wx" });
  console.log(`Exported ${records.length} inquiries to ${path.relative(root, output)}`);
}

exportInquiries().catch((error) => {
  console.error(`Inquiry export failed: ${error.message}`);
  process.exitCode = 1;
});
