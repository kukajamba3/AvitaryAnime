"use client";

import Image from "next/image";

function shouldSkipNextImageOpt(src: string) {
  const blocked = [
    "aniliberty.top",
    "anilibria.top",
    "anilibria.app",
    "libria.fun",
    "supabase.co",
    ".svg",
    "data:"
  ];
  return blocked.some(b => src.includes(b));
}

export function SafePosterImage({ src, alt, className, unoptimized, ...props }: any) {
  const finalUnoptimized = unoptimized !== undefined ? unoptimized : shouldSkipNextImageOpt(src);
  
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      unoptimized={finalUnoptimized}
      {...props}
    />
  );
}
