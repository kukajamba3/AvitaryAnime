import { CatalogClient } from "@/components/CatalogClient";

export default function CatalogPage() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#4a235a]">Каталог</h1>
          <p className="text-slate-600">В каталоге Avitary 120 тайтлов — выбирайте жанры, сезоны и удобную озвучку</p>
        </div>
      </header>
      <CatalogClient />
    </div>
  );
}
