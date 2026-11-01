import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('avitary_session')?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await query(`SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()`, [token]);
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { comment_id } = body;
  
  await query(`
    INSERT INTO comment_likes (comment_id, user_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
  `, [comment_id, sessions[0].user_id]);
  
  await query(`UPDATE anime_comments SET likes_count = likes_count + 1 WHERE id = $1`, [comment_id]);
  
  return NextResponse.json({ success: true });
}
