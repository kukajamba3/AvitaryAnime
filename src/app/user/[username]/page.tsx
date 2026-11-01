"use client";

import Link from "next/link";

export default function UserPage({ params }: { params: { username: string } }) {
  return (
    <div className="space-y-8">
      <div className="relative rounded-3xl overflow-hidden glass-panel">
        <div className="absolute inset-0 w-full h-48 bg-gradient-to-r from-rose-400 to-pink-500 opacity-80" />
        <div className="relative z-10 p-8 flex flex-col md:flex-row gap-8">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-white border-4 border-white/50 shadow-xl flex-shrink-0 overflow-hidden">
            <img src="https://cdn.myanimelist.net/images/user/avatar.jpg" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-white mb-2">{params.username}</h1>
            <p className="text-white/90 text-sm">Аниме-энтузиаст, смотрит 120+ тайтлов</p>
            <div className="flex gap-4 mt-4">
              <button className="px-6 py-2 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition">
                Подписаться
              </button>
              <Link href="/profile" className="px-6 py-2 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition">
                Профиль
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl">
          <h3 className="text-xl font-bold text-[#4a235a] mb-4">Статистика</h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-slate-600">Просмотрено аниме</div>
              <div className="text-2xl font-bold text-[#4a235a]">45</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Просмотрено серий</div>
              <div className="text-2xl font-bold text-[#4a235a]">890</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 glass-panel p-6 rounded-3xl">
          <h3 className="text-xl font-bold text-[#4a235a] mb-4">История просмотров</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-white/50 rounded-2xl border border-slate-200/50">
              <div className="w-16 h-24 bg-slate-200 rounded-xl flex-shrink-0"></div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-700">Frieren: Beyond Journey's End</h4>
                <p className="text-sm text-slate-500">Серия 12 · 24:00 · Просмотрено 5 мин назад</p>
              </div>
              <div className="text-rose-500 font-bold">90%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
