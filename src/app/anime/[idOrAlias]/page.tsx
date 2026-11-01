import { AnimePlayer } from "@/components/AnimePlayer";
import { SafePosterImage } from "@/components/SafePosterImage";
import { AnimeComments } from "@/components/AnimeComments";

export async function generateMetadata({ params }: { params: { idOrAlias: string } }) {
  // Fetch anime data
  const title = "Frieren: Beyond Journey's End"; // Mock
  return {
    title: `${title} — смотреть онлайн · Avitary`,
    description: `Просмотр и выбор озвучки на Avitary. ${title} — полный сериал в Full HD.`,
  };
}

export default function AnimePage({ params }: { params: { idOrAlias: string } }) {
  const animeId = 1; // Mock from params
  
  return (
    <div className="space-y-8">
      <div className="relative rounded-3xl overflow-hidden glass-panel">
        {/* Blurred background banner */}
        <SafePosterImage 
          src="https://cdn.myanimelist.net/images/anime/10/122395.jpg" 
          alt="Frieren"
          className="absolute inset-0 w-full h-96 object-cover blur-2xl opacity-50"
          unoptimized={true}
        />
        
        <div className="relative z-10 p-8 flex flex-col md:flex-row gap-8">
          <SafePosterImage 
            src="https://cdn.myanimelist.net/images/anime/10/122395.jpg" 
            alt="Frieren"
            className="w-48 h-64 md:w-64 md:h-96 rounded-2xl shadow-xl flex-shrink-0"
            unoptimized={true}
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-white/90 text-[#4a235a] text-xs font-bold rounded-full uppercase tracking-wider">
                Мульти-озвучка · Full HD
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#4a235a] mb-4">Frieren: Beyond Journey's End</h1>
            
            <div className="flex gap-6 text-sm text-slate-600 mb-6">
              <div><strong>Рейтинг:</strong> 9.1</div>
              <div><strong>Жанры:</strong> Фэнтези, Драма</div>
              <div><strong>Год:</strong> 2023</div>
            </div>

            <div className="flex gap-3 mb-8">
              <button className="flex-1 px-6 py-3 bg-rose-400 text-white font-bold rounded-2xl hover:bg-rose-500 transition">Смотрю</button>
              <button className="flex-1 px-6 py-3 bg-white border border-slate-200 text-[#4a235a] font-bold rounded-2xl hover:bg-slate-50 transition">В планах</button>
              <button className="p-3 bg-white border border-slate-200 text-[#4a235a] rounded-2xl hover:bg-slate-50 transition">
                <span className="text-rose-500">☆</span>
              </button>
            </div>

            <p className="text-slate-600 leading-relaxed mb-8">
              Эльфийская магия, путешествия и время. История о том, что значит быть человеком.
            </p>
          </div>
        </div>
      </div>

      <AnimePlayer animeId={animeId} />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#4a235a]">Связанные сезоны</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          <div className="w-32 h-48 bg-slate-200 rounded-xl flex-shrink-0"></div>
          <div className="w-32 h-48 bg-slate-200 rounded-xl flex-shrink-0"></div>
        </div>
      </div>

      <AnimeComments animeId={animeId} />
    </div>
  );
}
