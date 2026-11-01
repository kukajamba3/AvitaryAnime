import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, nickname, email, password } = body;
  
  const hash = await bcrypt.hash(password, 10);
  const res = await query(
    `INSERT INTO users (username, nickname, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id`,
    [username, nickname, email, hash]
  );
  
  return NextResponse.json({ success: true, userId: res[0].id });
}
