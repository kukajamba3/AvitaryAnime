"use client";

import React, { useState } from "react";

export default function ProfilePage() {
  const [nickname, setNickname] = useState("AvitaryUser");
  const [bio, setBio] = useState("");

  return (
    <div className="max-w-4xl mx-auto mt-12 space-y-8">
      <div className="glass-panel p-8 rounded-3xl">
        <h1 className="text-2xl font-bold text-[#4a235a] mb-8">Настройки аккаунта</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Никнейм</label>
            <input
              type="text"
              className="w-full p-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">О себе</label>
            <textarea
              className="w-full p-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-rose-400 text-white font-bold rounded-2xl hover:bg-rose-500 transition">
              Сохранить
            </button>
            <button className="px-6 py-3 bg-white border border-slate-200 text-[#4a235a] font-bold rounded-2xl hover:bg-slate-50 transition">
              Сменить пароль
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
