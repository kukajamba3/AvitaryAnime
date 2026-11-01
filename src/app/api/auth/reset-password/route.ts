import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { token, newPassword } = body;
  
  const users = await query(`SELECT id FROM users WHERE password_reset_token = $1 AND password_reset_expires_at > NOW()`, [token]);
  if (users.length === 0) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  
  const hash = await bcrypt.hash(newPassword, 10);
  await query(`UPDATE users SET password_hash = $1, password_reset_token = NULL, password_reset_expires_at = NULL WHERE id = $2`, [hash, users[0].id]);
  
  return NextResponse.json({ success: true });
}
