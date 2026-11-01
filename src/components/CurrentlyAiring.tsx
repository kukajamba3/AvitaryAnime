"use client";

import React from "react";

export function CurrentlyAiring() {
  // Mock components for compilation
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="glass-panel p-4 rounded-3xl border border-slate-200/80">
          <div className="w-full aspect-[2/3] bg-slate-200 rounded-xl mb-3"></div>
          <h4 className="text-sm font-bold text-[#4a235a]">Тайтл {i}</h4>
          <p className="text-xs text-slate-500">Серия 12</p>
        </div>
      ))}
    </div>
  );
}
