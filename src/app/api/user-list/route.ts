import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';

// GET: Get user lists
export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('avitary_session')?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await query(`SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()`, [token]);
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const lists = await query(`SELECT * FROM user_anime_lists WHERE user_id = $1`, [sessions[0].user_id]);
  return NextResponse.json({ lists });
}

// POST: Update/Add status
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('avitary_session')?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await query(`SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()`, [token]);
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { anime_id, anime_alias, anime_title, anime_poster, anime_year, anime_type, episodes_total, status, is_favorite, score } = body;
  
  await query(`
    INSERT INTO user_anime_lists (user_id, anime_id, anime_alias, anime_title, anime_poster, anime_year, anime_type, episodes_total, status, is_favorite, score)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    ON CONFLICT (user_id, anime_id) DO UPDATE SET
      anime_alias = EXCLUDED.anime_alias,
      anime_title = EXCLUDED.anime_title,
      anime_poster = EXCLUDED.anime_poster,
      anime_year = EXCLUDED.anime_year,
      anime_type = EXCLUDED.anime_type,
      episodes_total = EXCLUDED.episodes_total,
      status = EXCLUDED.status,
      is_favorite = EXCLUDED.is_favorite,
      score = EXCLUDED.score,
      updated_at = NOW()
  `, [sessions[0].user_id, anime_id, anime_alias, anime_title, anime_poster, anime_year, anime_type, episodes_total, status, is_favorite, score]);
  
  return NextResponse.json({ success: true });
}

// DELETE: Remove from list
export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('avitary_session')?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await query(`SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()`, [token]);
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const animeId = url.searchParams.get('anime_id');
  
  await query(`DELETE FROM user_anime_lists WHERE user_id = $1 AND anime_id = $2`, [sessions[0].user_id, animeId]);
  
  return NextResponse.json({ success: true });
}
