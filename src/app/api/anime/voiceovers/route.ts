import { NextResponse } from 'next/server';

// Cache-Control: public, max-age=600, s-maxage=1800, stale-while-revalidate=3600
export async function GET(request: Request) {
  const url = new URL(request.url);
  const animeId = url.searchParams.get('id');
  
  // Mock voiceovers for compilation
  const response = NextResponse.json({
    animeId,
    tracks: [
      {
        id: "anilibria-1080",
        studio: "AniLibria",
        quality: "1080p",
        episodes: 12,
        streamKind: "hls",
        playerMode: "native",
        url: "https://example.com/stream.m3u8",
        icon: "Mic",
        label: "AniLibria · 1080p"
      }
    ]
  });
  
  response.headers.set('Cache-Control', 'public, max-age=600, s-maxage=1800, stale-while-revalidate=3600');
  return response;
}
