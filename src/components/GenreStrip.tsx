"use client";

import Link from "next/link";

const genres = ["Экшн", "Фэнтези", "Романтика", "Комедия", "Драма", "Сейнен", "Сёдзё", "Исекай", "Меха", "Ужасы"];

export function GenreStrip() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
      {genres.map((genre) => (
        <Link
          key={genre}
          href={`/catalog?genre=${encodeURIComponent(genre)}`}
          className="px-5 py-2 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl text-sm font-medium text-slate-700 hover:bg-rose-50 hover:border-rose-200 transition whitespace-nowrap"
        >
          {genre}
        </Link>
      ))}
      <Link href="/catalog" className="px-5 py-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-2xl text-sm font-bold hover:shadow-lg transition whitespace-nowrap">
        Случайное аниме
      </Link>
    </div>
  );
}
