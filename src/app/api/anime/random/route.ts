import { NextResponse } from 'next/server';

export async function GET() {
  // Mock random anime
  return NextResponse.json({ id: 1, title: "Frieren", alias: "Sousou no Frieren", year: 2023 });
}
