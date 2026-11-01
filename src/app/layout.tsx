import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Avitary — Смотреть аниме онлайн в Full HD",
  template: "%s · Avitary",
  description: "Самостоятельная аниме-платформа Avitary — смотреть онлайн в Full HD и 4K.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser(); // SSR session
  
  return (
    <html lang="ru">
      <body className="bg-[#f3e8ff] text-slate-800">
        <Navbar initialUser={user as { username: string; nickname: string; avatar_url?: string } | undefined} />
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
