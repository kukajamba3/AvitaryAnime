import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { token } = body;
  
  const users = await query(`SELECT id FROM users WHERE email_confirmation_token = $1`, [token]);
  if (users.length === 0) return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  
  await query(`UPDATE users SET email_confirmed = TRUE, email_confirmation_token = NULL WHERE id = $1`, [users[0].id]);
  
  return NextResponse.json({ success: true });
}
