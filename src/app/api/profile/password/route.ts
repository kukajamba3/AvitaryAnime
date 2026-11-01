import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('avitary_session')?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await query(`SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()`, [token]);
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { currentPassword, newPassword } = body;
  
  const user = await query(`SELECT id, password_hash FROM users WHERE id = $1`, [sessions[0].user_id]);
  const match = await bcrypt.compare(currentPassword, user[0].password_hash);
  if (!match) return NextResponse.json({ error: "Invalid current password" }, { status: 400 });
  
  const hash = await bcrypt.hash(newPassword, 10);
  await query(`UPDATE users SET password_hash = $1 WHERE id = $2`, [hash, sessions[0].user_id]);
  
  return NextResponse.json({ success: true });
}
