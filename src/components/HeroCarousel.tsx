"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroItem {
  id: number;
  title: string;
  poster: string;
  description: string;
}

const items: HeroItem[] = [
  { id: 1, title: "Frieren: Beyond Journey's End", poster: "https://cdn.myanimelist.net/images/anime/10/122395.jpg", description: "Путешествие эльфийки-мага." },
  { id: 2, title: "Jujutsu Kaisen", poster: "https://cdn.myanimelist.net/images/anime/10/100000.jpg", description: "Борьба с проклятиями." },
  { id: 3, title: "Attack on Titan", poster: "https://cdn.myanimelist.net/images/anime/10/20000.jpg", description: "Человечество против титанов." },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const item = items[index];

  return (
    <div className="relative h-[500px] rounded-3xl overflow-hidden glass-panel shadow-xl">
      <img
        src={item.poster}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: `scale(${1 + index * 0.02})` }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-12">
        <div className="flex gap-3 mb-4">
          <span className="px-3 py-1 bg-rose-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
            В центре внимания
          </span>
          <span className="px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
            Выбор озвучки · 1080p
          </span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">{item.title}</h1>
        <p className="text-slate-200 text-lg max-w-2xl mb-8 drop-shadow-sm">{item.description}</p>
        <Link href={`/anime/${item.id}`} className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-2xl hover:scale-105 transition shadow-lg">
          Смотреть онлайн
        </Link>
      </div>

      {/* Navigation */}
      <button 
        onClick={() => setIndex((prev) => (prev - 1 + items.length) % items.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={() => setIndex((prev) => (prev + 1) % items.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, i) => (
          <div 
            key={i}
            className={`w-3 h-3 rounded-full transition ${i === index ? 'bg-rose-500' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}
