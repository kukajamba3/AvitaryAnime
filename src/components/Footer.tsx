"use client";

import Link from "next/link";
import { Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-slate-200/80 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold text-[#4a235a] mb-2">Avitary</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Самостоятельная платформа для просмотра аниме онлайн в Full HD. 
            Мы создаём пространство, где каждый тайтл — это искусство, доступное каждому.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-[#4a235a] mb-4">Возможности Avitary</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/catalog" className="hover:text-rose-500 transition">Умный каталог</Link></li>
            <li><Link href="/schedule" className="hover:text-rose-500 transition">Расписание релизов</Link></li>
            <li><Link href="/profile" className="hover:text-rose-500 transition">Личные списки</Link></li>
            <li><Link href="#" className="hover:text-rose-500 transition">Мульти-озвучка</Link></li>
            <li><Link href="#" className="hover:text-rose-500 transition">Режим кинотеатра</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-[#4a235a] mb-4">Сообщество</h4>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-rose-500 transition"><Twitter size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-rose-500 transition"><Youtube size={20} /></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-200/50 text-center text-slate-400 text-xs">
        © {new Date().getFullYear()} Avitary — самостоятельная аниме-платформа.
      </div>
    </footer>
  );
}
