export const runtime = 'edge';


import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxZpmi8A2Ugc2i0OIb8zo_Rg41xlyz5gIbBP1n8dqSWuv5RttYwQkWeSSxIZBDlFmNhlg/exec';

export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}


export async function POST(req: NextRequest) {
  try {
    const { clientName, clientContact } = await req.json();

    if (!clientName || !clientContact) {
      const errorRes = NextResponse.json({ success: false, error: 'Missing name or contact' }, { status: 400 });
      errorRes.headers.set('Access-Control-Allow-Origin', '*');
      return errorRes;
    }

    const payload = {
      name: clientName,
      phone: clientContact,
    };

    const googleResponse = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resultText = await googleResponse.text();

    const res = NextResponse.json({ success: true, result: resultText });
    res.headers.set('Access-Control-Allow-Origin', '*');
    return res;
  } catch (error: any) {
    console.error('Error forwarding to Google Sheets:', error);
    const errRes = NextResponse.json({ success: false, error: error.message }, { status: 500 });
    errRes.headers.set('Access-Control-Allow-Origin', '*');
    return errRes;
  }
}

