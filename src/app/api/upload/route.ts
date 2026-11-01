import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const buffer = await file.arrayBuffer();
  
  // Compress to WebP if Supabase is not configured
  const webpBuffer = await sharp(buffer)
    .webp({ quality: 80 })
    .toBuffer();
  
  const base64 = `data:image/webp;base64,${webpBuffer.toString('base64')}`;
  
  // In production, save to DB or Supabase
  return NextResponse.json({ url: base64 });
}
