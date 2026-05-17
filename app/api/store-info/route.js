import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

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
    const sheet = doc.sheetsByIndex[0];

    if (!sheet) {
      console.error("❌ No sheet found in spreadsheet");
      return Response.json(
        { error: 'No sheet found in spreadsheet' },
        { status: 500 }
      );
    }

    // ✅ Save Data
    await sheet.addRow({
      Name: name,
      Email: email,
      'Phone Number': phone,
      'Company/Project Name': company,
      Message: message,
      Date: new Date().toLocaleString(),
    });

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