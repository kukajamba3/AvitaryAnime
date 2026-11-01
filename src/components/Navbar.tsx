"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Bell, User, Menu } from "lucide-react";

interface NavbarProps {
  initialUser?: {
    username: string;
    nickname: string;
    avatar_url?: string;
  };
}

export function Navbar({ initialUser }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <nav className="glass-panel sticky top-4 z-30 mb-6">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#4a235a] tracking-tight">
          Avitary
        </Link>

        <div className="relative flex-1 max-w-md mx-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Поиск аниме на Avitary..."
            className="w-full pl-10 pr-4 py-2 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(e.target.value.length > 0);
            }}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-rose-500 animate-pulse">
              Ищем на Avitary...
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-600 hover:text-rose-500 transition">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>

          {initialUser ? (
            <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 bg-rose-400 text-white rounded-2xl hover:bg-rose-500 transition">
              <img src={initialUser.avatar_url || ""} alt={initialUser.nickname} className="w-8 h-8 rounded-full object-cover border border-white/50" />
              <span className="text-sm font-medium">{initialUser.nickname}</span>
            </Link>
          ) : (
            <Link href="/auth/login" className="flex items-center gap-2 px-4 py-2 bg-rose-400 text-white rounded-2xl hover:bg-rose-500 transition">
              <User size={18} />
              <span className="text-sm font-medium">Войти</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
