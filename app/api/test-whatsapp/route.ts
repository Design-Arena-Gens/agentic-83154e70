import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { number } = await request.json();

    // In production, integrate with WhatsApp Business API or Twilio
    console.log(`Test WhatsApp message to ${number}`);

    // Simulate sending a test message
    const message = `🤖 Email Automation Agent Test\n\nThis is a test notification. Your agent is configured correctly!`;

    // You would use a service like:
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const client = require('twilio')(accountSid, authToken);
    //
    // await client.messages.create({
    //   from: 'whatsapp:+14155238886',
    //   body: message,
    //   to: `whatsapp:${number}`
    // });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error('WhatsApp test error:', error);
    return NextResponse.json(
      { error: 'Failed to send test message' },
      { status: 500 }
    );
  }
}
