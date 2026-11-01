"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mic, Captions, SkipForward, SkipBack } from "lucide-react";
import type { VoiceoverTrack } from "@/lib/voiceovers";

interface AnimePlayerProps {
  animeId: number;
  initialTrack?: VoiceoverTrack;
  initialEpisode?: number;
  initialSeconds?: number;
}

export function AnimePlayer({ animeId, initialTrack, initialEpisode = 1, initialSeconds = 0 }: AnimePlayerProps) {
  const [track, setTrack] = useState<VoiceoverTrack | undefined>(initialTrack);
  const [episode, setEpisode] = useState(initialEpisode);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cinemaMode, setCinemaMode] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);

  // Save state to localStorage
  useEffect(() => {
    if (track) {
      localStorage.setItem(`avitary_voice_${animeId}`, track.id);
    }
  }, [track, animeId]);

  useEffect(() => {
    const savedTrackId = localStorage.getItem(`avitary_voice_${animeId}`);
    // Logic to load track by ID would go here
  }, [animeId]);

  const handleTrackChange = (newTrack: VoiceoverTrack) => {
    // Save current state before switching
    if (videoRef.current) {
      localStorage.setItem(`avitary_progress_${animeId}_${track?.id || 'default'}`, `${episode}:${videoRef.current.currentTime}:${isPlaying}`);
    }
    setTrack(newTrack);
    // Reset episode/seconds or load from storage
    setEpisode(1);
    setSeconds(0);
  };

  const handleStreamError = () => {
    if (track?.quality === "720p") {
      // Auto switch to 480p
      const fallbackTrack: VoiceoverTrack = { ...track, quality: "480p", url: track.url.replace("720p", "480p") };
      setTrack(fallbackTrack);
    }
  };

  useEffect(() => {
    if (!track) return;

    if (track.streamKind === "hls" && track.playerMode === "native") {
      // Dynamic import hls.js
      import("hls.js").then(({ default: Hls }) => {
        if (Hls.isSupported() && videoRef.current) {
          const hls = new Hls();
          hls.loadSource(track.url);
          hls.attachMedia(videoRef.current);
          hlsRef.current = hls;
        }
      });
    } else if (track.streamKind === "mp4" && track.playerMode === "native") {
      if (videoRef.current) {
        videoRef.current.src = track.url;
        videoRef.current.setAttribute("referrerpolicy", "no-referrer");
        videoRef.current.onerror = handleStreamError;
      }
    }
    // iframe mode handled separately in render
  }, [track, animeId]);

  return (
    <div className={`relative w-full aspect-video glass-panel overflow-hidden ${cinemaMode ? 'cinema-mode cinema-player' : ''}`}>
      {track?.playerMode === "native" && (
        <>
          <video
            ref={videoRef}
            className="w-full h-full"
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setEpisode(ep => ep + 1)}
          />
          
          {/* Player Controls Overlay */}
          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex gap-2">
              <select 
                className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-lg p-2 text-sm"
                onChange={(e) => {
                  // Find track by ID logic
                }}
              >
                {track && <option value={track.id}>{track.label}</option>}
              </select>
              <div className="flex gap-1">
                {["AniLibria", "AnimeVost", "SovetRomantica", "Kodik"].map(studio => (
                  <button key={studio} className="px-3 py-1 bg-rose-400/80 text-white rounded-full text-xs hover:bg-rose-500 transition">
                    {studio}
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setCinemaMode(!cinemaMode)}
              className="p-2 bg-white/80 rounded-full hover:bg-white transition"
            >
              {cinemaMode ? "Выйти" : "Кинотеатр"}
            </button>
          </div>

          {/* Skip Buttons */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-4">
             <button className="p-3 bg-rose-500 text-white rounded-full shadow-lg"><SkipBack size={20}/></button>
             <button className="p-3 bg-rose-500 text-white rounded-full shadow-lg"><SkipForward size={20}/></button>
          </div>
        </>
      )}

      {track?.playerMode === "iframe" && (
        <iframe
          src={track.url}
          className="w-full h-full border-none"
          allowFullScreen
        />
      )}

      {/* Track Selector UI */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 overflow-x-auto">
             {track && (
               <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-md">
                 {track.icon === "Mic" ? <Mic size={14} /> : <Captions size={14} />}
                 <span>{track.label}</span>
               </div>
             )}
          </div>
          <div className="text-sm">Серия {episode} · {Math.floor(seconds/60)}:{String(seconds%60).padStart(2, '0')}</div>
        </div>
      </div>
    </div>
  );
}
