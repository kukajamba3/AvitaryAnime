"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { AnimeCard } from "./AnimeCard";

export function CatalogClient() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [animeList, setAnimeList] = useState<any[]>([]);

  // Mock data for initial load
  useEffect(() => {
    // In production, fetch from /api/anime/catalog
    setAnimeList([
      { id: 1, title: "Frieren: Beyond Journey's End", poster: "https://cdn.myanimelist.net/images/anime/10/122395.jpg", year: 2023, type: "TV", genre: "Фэнтези", episodes: 28, aliasSlug: "frieren-beyond-journeys-end" },
      { id: 2, title: "Jujutsu Kaisen", poster: "https://cdn.myanimelist.net/images/anime/10/100000.jpg", year: 2023, type: "TV", genre: "Экшн", episodes: 47, aliasSlug: "jujutsu-kaisen" },
      { id: 3, title: "Attack on Titan", poster: "https://cdn.myanimelist.net/images/anime/10/20000.jpg", year: 2013, type: "TV", genre: "Драма", episodes: 89, aliasSlug: "attack-on-titan" },
      { id: 4, title: "Fullmetal Alchemist", poster: "https://cdn.myanimelist.net/images/anime/10/9999.jpg", year: 2009, type: "TV", genre: "Приключения", episodes: 64, aliasSlug: "fullmetal-alchemist" },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center glass-panel p-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Поиск в каталоге..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select 
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">Все статусы</option>
            <option value="ongoing">Онгоинг</option>
            <option value="completed">Завершено</option>
          </select>
          <button className="px-4 py-2 bg-rose-400 text-white rounded-xl hover:bg-rose-500 transition flex items-center gap-2">
            <Filter size={16} /> Фильтры
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {animeList.map((anime) => (
          <AnimeCard key={anime.id} {...anime} />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button 
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-6 py-2 border border-slate-200 rounded-xl disabled:opacity-50 hover:bg-slate-50 transition"
        >
          Предыдущая
        </button>
        <span className="text-slate-500 font-medium">Страница {page}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          className="px-6 py-2 bg-rose-400 text-white rounded-xl hover:bg-rose-500 transition"
        >
          Следующая
        </button>
      </div>
    </div>
  );
}
