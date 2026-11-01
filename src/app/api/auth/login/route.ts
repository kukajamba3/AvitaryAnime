import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  
  const users = await query(`SELECT * FROM users WHERE email = $1`, [email]);
  if (users.length === 0) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  
  const match = await bcrypt.compare(password, users[0].password_hash);
  if (!match) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  
  // Create session (mock token)
  const token = "session_token_" + Date.now();
  await query(`INSERT INTO sessions (token, user_id, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')`, [token, users[0].id]);
  
  const response = NextResponse.json({ success: true, user: users[0] });
  response.cookies.set('avitary_session', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 });
  
  return response;
}
