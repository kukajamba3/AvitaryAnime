"use client";

import React, { useState } from "react";
import { Heart, MessageSquare } from "lucide-react";

export function AnimeComments({ animeId }: { animeId: number }) {
  const [comment, setComment] = useState("");

  return (
    <div className="space-y-6 glass-panel p-6">
      <h2 className="text-xl font-bold text-[#4a235a]">Комментарии</h2>
      
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 flex-shrink-0"></div>
        <div className="flex-1">
          <textarea
            className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            rows={3}
            placeholder="Напишите комментарий..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button className="px-4 py-2 bg-rose-400 text-white rounded-xl hover:bg-rose-500 transition">
              Отправить
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-8">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-slate-700">Александр Иванов</span>
              <span className="text-xs text-slate-400">2 часа назад</span>
            </div>
            <p className="text-slate-600 text-sm">Отличное аниме, очень трогательно. Мульти-озвучка работает идеально!</p>
            <div className="flex gap-4 mt-3 text-xs text-slate-500">
              <button className="flex items-center gap-1 hover:text-rose-500 transition">
                <Heart size={14} /> 12
              </button>
              <button className="flex items-center gap-1 hover:text-rose-500 transition">
                <MessageSquare size={14} /> Ответить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
