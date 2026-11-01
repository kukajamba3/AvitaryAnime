import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';

// GET: Get comments for anime
export async function GET(request: Request) {
  const url = new URL(request.url);
  const animeId = url.searchParams.get('anime_id');
  
  const comments = await query(`SELECT * FROM anime_comments WHERE anime_id = $1 ORDER BY created_at DESC`, [animeId]);
  return NextResponse.json({ comments });
}

// POST: Add comment
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('avitary_session')?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await query(`SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()`, [token]);
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { anime_id, content, parent_id } = body;
  
  const res = await query(`
    INSERT INTO anime_comments (anime_id, user_id, parent_id, content)
    VALUES ($1, $2, $3, $4) RETURNING id
  `, [anime_id, sessions[0].user_id, parent_id || null, content]);
  
  return NextResponse.json({ success: true, commentId: res[0].id });
}
