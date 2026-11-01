import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';

// GET: Get history
export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('avitary_session')?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await query(`SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()`, [token]);
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const history = await query(`SELECT * FROM watch_history WHERE user_id = $1`, [sessions[0].user_id]);
  return NextResponse.json({ history });
}

// POST: Update progress
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('avitary_session')?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await query(`SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()`, [token]);
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { anime_id, anime_alias, anime_title, anime_poster, episode_ordinal, episode_name, progress_seconds, duration_seconds } = body;
  
  await query(`
    INSERT INTO watch_history (user_id, anime_id, anime_alias, anime_title, anime_poster, episode_ordinal, episode_name, progress_seconds, duration_seconds)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ON CONFLICT (user_id, anime_id) DO UPDATE SET
      anime_alias = EXCLUDED.anime_alias,
      anime_title = EXCLUDED.anime_title,
      anime_poster = EXCLUDED.anime_poster,
      episode_ordinal = EXCLUDED.episode_ordinal,
      episode_name = EXCLUDED.episode_name,
      progress_seconds = EXCLUDED.progress_seconds,
      duration_seconds = EXCLUDED.duration_seconds,
      watched_at = NOW()
  `, [sessions[0].user_id, anime_id, anime_alias, anime_title, anime_poster, episode_ordinal, episode_name, progress_seconds, duration_seconds]);
  
  return NextResponse.json({ success: true });
}
