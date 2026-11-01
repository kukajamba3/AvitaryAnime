"use client";

import Link from "next/link";
import Image from "next/image";

interface AnimeCardProps {
  id: number;
  title: string;
  poster: string;
  year: number;
  type: string;
  genre: string;
  episodes: number;
  aliasSlug: string;
}

function shouldSkipNextImageOpt(src: string) {
  const blocked = [
    "aniliberty.top",
    "anilibria.top",
    "anilibria.app",
    "libria.fun",
    "supabase.co",
    ".svg",
    "data:"
  ];
  return blocked.some(b => src.includes(b));
}

export function AnimeCard({ id, title, poster, year, type, genre, episodes, aliasSlug }: AnimeCardProps) {
  return (
    <Link href={`/anime/${aliasSlug}`} className="group relative flex flex-col bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl overflow-hidden hover:shadow-xl transition duration-300">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={poster}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition duration-500"
          unoptimized={shouldSkipNextImageOpt(poster)}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3">
          <div className="flex justify-between items-end text-white">
            <span className="text-xs font-bold uppercase tracking-wider">Рус. озвучка</span>
            <span className="text-xs font-medium bg-rose-500/80 px-2 py-0.5 rounded-full">{episodes} серий</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-[#4a235a] line-clamp-2 mb-1">{title}</h3>
        <div className="text-xs text-slate-500 flex gap-2 mb-2">
          <span>{type}</span>
          <span>·</span>
          <span>{year}</span>
        </div>
        <span className="text-[10px] text-rose-500 font-medium uppercase tracking-wider">{genre}</span>
      </div>
    </Link>
  );
}
