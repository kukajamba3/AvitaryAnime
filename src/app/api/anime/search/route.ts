import { NextResponse } from 'next/server';
import { safeHttpsRequest } from '@/lib/http-client';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  
  // Mock search result for compilation
  return NextResponse.json([
    { id: 1, title: "Frieren", alias: "Sousou no Frieren", year: 2023 }
  ]);
}
