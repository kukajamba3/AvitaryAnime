import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('avitary_session')?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await query(`SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()`, [token]);
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await query(`SELECT id, username, nickname, email, avatar_url, banner_url, bio, role, email_confirmed FROM users WHERE id = $1`, [sessions[0].user_id]);
  
  return NextResponse.json({ user: user[0] });
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('avitary_session')?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await query(`SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()`, [token]);
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { nickname, bio } = body;
  
  await query(`UPDATE users SET nickname = $1, bio = $2 WHERE id = $3`, [nickname, bio, sessions[0].user_id]);
  
  return NextResponse.json({ success: true });
}
