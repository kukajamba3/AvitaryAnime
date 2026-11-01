export interface VoiceoverTrack {
  id: string;
  studio: string;
  quality: '1080p' | '720p' | '480p';
  episodes: number;
  streamKind: 'hls' | 'mp4' | 'iframe';
  playerMode: 'native' | 'iframe';
  url: string;
  isSubtitles?: boolean;
  icon: 'Mic' | 'Captions';
  label: string;
}

export interface VoiceoverAggregator {
  animeId: number;
  tracks: VoiceoverTrack[];
}

// Cache Control: public, max-age=600, s-maxage=1800, stale-while-revalidate=3600
export async function getVoiceovers(animeId: number, title: string, year: number): Promise<VoiceoverAggregator> {
  // Implementation for AniLibria, AnimeVost, SovetRomantica, Kodik
  // For now, returning mock structure for compilation
  return {
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
  };
}
