import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const runtime = 'nodejs';

const DEFAULT_HEADERS = [
  'Name',
  'Email',
  'Phone Number',
  'Company/Project Name',
  'Message',
  'Date',
];

const HEADER_ALIASES = {
  name: ['Name', 'name', 'Full Name', 'full name'],
  email: ['Email', 'email'],
  phone: ['Phone Number', 'phone', 'Phone', 'Phone Number'],
  company: ['Company/Project Name', 'Company', 'Project Name', 'company'],
  message: ['Message', 'Requirement', 'Inquiry', 'Details', 'message'],
  date: ['Date', 'Created At', 'Submitted At', 'Timestamp', 'date'],
};

function normalizeHeader(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function pickHeader(headerValues, aliases) {
  const normalizedHeaders = headerValues.map((header) => ({
    raw: header,
    normalized: normalizeHeader(header),
  }));

  for (const alias of aliases) {
    const normalizedAlias = normalizeHeader(alias);
    const match = normalizedHeaders.find((header) => header.normalized === normalizedAlias);
    if (match) return match.raw;
  }

  return aliases[0];
}

function buildRowForSheet(headerValues, payload) {
  const row = {};

  row[pickHeader(headerValues, HEADER_ALIASES.name)] = payload.name;
  row[pickHeader(headerValues, HEADER_ALIASES.email)] = payload.email;
  row[pickHeader(headerValues, HEADER_ALIASES.phone)] = payload.phone;
  row[pickHeader(headerValues, HEADER_ALIASES.company)] = payload.company;
  row[pickHeader(headerValues, HEADER_ALIASES.message)] = payload.message;
  row[pickHeader(headerValues, HEADER_ALIASES.date)] =
    payload.date || new Date().toLocaleString();

  return row;
}

async function getTargetSheet(doc) {
  const preferredTitle = process.env.GOOGLE_SHEET_TAB_NAME?.trim();

  if (preferredTitle) {
    const byTitle = doc.sheetsByTitle[preferredTitle];
    if (byTitle) return byTitle;

    const caseInsensitiveMatch = Object.values(doc.sheetsByTitle).find(
      (sheet) => sheet.title?.toLowerCase() === preferredTitle.toLowerCase()
    );

    if (caseInsensitiveMatch) return caseInsensitiveMatch;

    console.warn(`⚠️ GOOGLE_SHEET_TAB_NAME="${preferredTitle}" was not found. Falling back to the first sheet.`);
  }

  return doc.sheetsByIndex[0];
}

async function ensureHeaders(sheet) {
  try {
    await sheet.loadHeaderRow();
  } catch {
    await sheet.setHeaderRow(DEFAULT_HEADERS);
    return DEFAULT_HEADERS;
  }

  const headerValues = Array.isArray(sheet.headerValues)
    ? sheet.headerValues.filter(Boolean)
    : [];

  if (!headerValues.length) {
    await sheet.setHeaderRow(DEFAULT_HEADERS);
    return DEFAULT_HEADERS;
  }

  return headerValues;
}

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("Incoming Data:", body);

    const { name, email, phone, company, message } = body;

    // ✅ Validation
    if (!name || !email || !phone || !company || !message) {
      return Response.json(
        { error: 'All fields required' },
        { status: 400 }
      );
    }

    // ✅ Check environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      console.error("❌ Missing GOOGLE_SERVICE_ACCOUNT_EMAIL");
      return Response.json(
        { error: 'Server configuration error: missing email' },
        { status: 500 }
      );
    }

    if (!process.env.GOOGLE_PRIVATE_KEY) {
      console.error("❌ Missing GOOGLE_PRIVATE_KEY");
      return Response.json(
        { error: 'Server configuration error: missing private key' },
        { status: 500 }
      );
    }

    if (!process.env.GOOGLE_SHEET_ID) {
      console.error("❌ Missing GOOGLE_SHEET_ID");
      return Response.json(
        { error: 'Server configuration error: missing sheet ID' },
        { status: 500 }
      );
    }

    // ✅ Auth setup
    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // ✅ Connect Sheet
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID,
      auth
    );

    await doc.loadInfo();
    const sheet = await getTargetSheet(doc);

    if (!sheet) {
      console.error("❌ No sheet found in spreadsheet");
      return Response.json(
        { error: 'No sheet found in spreadsheet' },
        { status: 500 }
      );
    }

    const headerValues = await ensureHeaders(sheet);

    // ✅ Save Data
    await sheet.addRow(
      buildRowForSheet(headerValues, {
        name,
        email,
        phone,
        company,
        message,
        date: new Date().toLocaleString(),
      })
    );

    console.log("✅ Data Saved Successfully");

    return Response.json({ success: true });

  } catch (err) {
    console.error("❌ ERROR:", err.message || err);
    console.error("Stack:", err.stack);

    return Response.json(
      { error: err.message || 'Failed to save data' },
      { status: 500 }
    );
  }
}
