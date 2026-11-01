import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';

// GET: Get notifications
export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('avitary_session')?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await query(`SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()`, [token]);
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const notifications = await query(`SELECT * FROM notifications WHERE user_id = $1 AND is_read = FALSE ORDER BY created_at DESC`, [sessions[0].user_id]);
  return NextResponse.json({ notifications });
}

// POST: Mark as read
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('avitary_session')?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await query(`SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()`, [token]);
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { id } = body;
  
  await query(`UPDATE notifications SET is_read = TRUE WHERE id = $1 AND user_id = $2`, [id, sessions[0].user_id]);
  
  return NextResponse.json({ success: true });
}
