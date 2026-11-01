import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') || '24');
  const offset = parseInt(url.searchParams.get('offset') || '0');
  
  // In production, use safeHttpsRequest for external mirrors if ANILIBERTY_OFFLINE is false
  // Here we return from local catalog seed
  const anime = await query(`SELECT * FROM anime_catalog LIMIT $1 OFFSET $2`, [limit, offset]);
  
  return NextResponse.json({ total: anime.length, items: anime });
}
