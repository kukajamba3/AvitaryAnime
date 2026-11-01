import { FreshEpisodes } from "@/components/FreshEpisodes";
import { CurrentlyAiring } from "@/components/CurrentlyAiring";
import { PopularAnime } from "@/components/PopularAnime";
import { HeroCarousel } from "@/components/HeroCarousel";
import { GenreStrip } from "@/components/GenreStrip";

export default function Page() {
  return (
    <div className="space-y-12">
      <HeroCarousel />
      <GenreStrip />
      
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-[#4a235a]">Свежие серии на Avitary</h2>
        <p className="text-slate-600">Новые эпизоды в русской озвучке и субтитрах — 24 свежих релиза</p>
        <FreshEpisodes />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-[#4a235a]">Сейчас выходит</h2>
        <CurrentlyAiring />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-[#4a235a]">Популярное на Avitary</h2>
        <PopularAnime />
      </section>
    </div>
  );
}
