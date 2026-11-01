import Link from "next/link";

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
const today = new Date().getDay(); // 0 = Sun, 1 = Mon ...

export default function SchedulePage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-[#4a235a]">Расписание</h1>
        <p className="text-slate-600">График выхода новых серий текущих онгоингов на Avitary по дням недели.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {days.map((day, idx) => {
          const isToday = (idx + 1) % 7 === today;
          return (
            <div key={day} className={`glass-panel p-4 ${isToday ? 'ring-2 ring-rose-400 border-transparent' : ''}`}>
              <h3 className={`font-bold mb-3 ${isToday ? 'text-rose-500' : 'text-[#4a235a]'}`}>
                {day} {isToday && <span className="text-xs bg-rose-100 text-rose-500 px-2 py-0.5 rounded-full ml-2">Сегодня</span>}
              </h3>
              <ul className="space-y-3">
                <li className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="w-1 h-1 bg-rose-400 rounded-full mt-1.5"></span>
                  <Link href="/anime/1" className="hover:text-rose-500 transition">Frieren (Серия 12)</Link>
                </li>
                <li className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="w-1 h-1 bg-rose-400 rounded-full mt-1.5"></span>
                  <Link href="/anime/2" className="hover:text-rose-500 transition">Jujutsu Kaisen (Серия 24)</Link>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
