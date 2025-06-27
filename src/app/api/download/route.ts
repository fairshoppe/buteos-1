import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/services/emailService';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Send download email
    await sendEmail({
      to: email,
      subject: 'Your Free Digital Marketing Guide - Download Link Inside',
      body: `
        <h2>Thank you for your interest!</h2>
        <p>Here's your free Digital Marketing Guide download link:</p>
        <p><a href="https://your-download-link.com" style="background: #13699a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Download Your Guide</a></p>
        <p>Best regards,<br>The Buteos Systems Team</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Download email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}