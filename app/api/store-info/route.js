import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("Incoming Data:", body); // ✅ correct place

    const { name, email, phone, company, message } = body;

    // ✅ Validation
    if (!name || !email || !phone || !company || !message) {
      return Response.json(
        { error: 'All fields required' },
        { status: 400 }
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
    console.error("❌ ERROR:", err);

    return Response.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
}