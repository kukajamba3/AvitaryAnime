"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-md mx-auto mt-20 glass-panel p-8 rounded-3xl">
      <h1 className="text-3xl font-bold text-[#4a235a] mb-8 text-center">Войти в Avitary</h1>
      
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Пароль</label>
          <input
            type="password"
            className="w-full p-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-2xl hover:shadow-lg transition">
          Войти
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600">
        Нет аккаунта? <Link href="/auth/register" className="text-rose-500 font-medium hover:underline">Зарегистрироваться</Link>
      </div>
    </div>
  );
}
