import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;
  
  const token = "verify_" + Date.now();
  await query(`UPDATE users SET email_confirmation_token = $1, email_confirmation_sent_at = NOW() WHERE email = $2`, [token, email]);
  
  console.log(`Verification link for ${email}: https://avitary.ru/auth/verify-email?token=${token}`);
  
  return NextResponse.json({ success: true });
}
