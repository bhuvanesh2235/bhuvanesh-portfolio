// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail } from '@/lib/resend';

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  subject: z.string().default(''),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body   = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    // Send email via Resend
    const emailResult = await sendContactEmail({ name, email, subject, message });

    if (!emailResult.success) {
      console.warn('Email delivery failed:', emailResult.error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
