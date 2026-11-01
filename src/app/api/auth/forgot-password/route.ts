import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;
  
  const token = "reset_" + Date.now();
  await query(`UPDATE users SET password_reset_token = $1, password_reset_expires_at = NOW() + INTERVAL '1 hour' WHERE email = $2`, [token, email]);
  
  console.log(`Reset link for ${email}: https://avitary.ru/auth/reset-password?token=${token}`);
  
  return NextResponse.json({ success: true });
}
