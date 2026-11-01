import { NextResponse } from 'next/server';
import { safeHttpsRequest } from '@/lib/http-client';

// Poster enricher via Jikan API
export async function GET(request: Request) {
  const url = new URL(request.url);
  const animeId = url.searchParams.get('id');
  
  if (!animeId) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  // Fetch from Jikan API (works in RF)
  try {
    const res = await safeHttpsRequest(`https://api.jikan.moe/v4/anime/${animeId}`);
    const data = JSON.parse(res.body.toString());
    return NextResponse.json({ poster: data.data.images.jpg.large_image_url });
  } catch (e) {
    // Fallback
    return NextResponse.json({ poster: "https://cdn.myanimelist.net/images/anime/10/122395.jpg" });
  }
}
