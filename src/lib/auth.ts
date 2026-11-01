import { cookies } from 'next/headers';
import { query } from './db';
import bcrypt from 'bcryptjs';

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('avitary_session')?.value;
    if (!token) return null;

    const sessions = await query(
      `SELECT user_id, expires_at FROM sessions WHERE token = $1 AND expires_at > NOW()`,
      [token]
    );
    if (sessions.length === 0) return null;

    const user = await query(
      `SELECT id, username, nickname, email, avatar_url, banner_url, bio, role, email_confirmed FROM users WHERE id = $1`,
      [sessions[0].user_id]
    );
    return user[0] || null;
  } catch (e) {
    return null;
  }
}

export async function registerUser(username: string, nickname: string, email: string, password: string) {
  const hash = await bcrypt.hash(password, 10);
  const res = await query(
    `INSERT INTO users (username, nickname, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id`,
    [username, nickname, email, hash]
  );
  return res[0];
}
