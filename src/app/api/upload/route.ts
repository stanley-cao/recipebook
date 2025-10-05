import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  console.log('UPLOAD ROUTE HIT with max=400x400')
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  console.log('Got file:', file?.name)
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  // Read bytes
  const bytes = Buffer.from(await file.arrayBuffer())

  // Normalize + resize with sharp
  const MAX = 250

  const { data, info } = await sharp(bytes, { failOn: 'none'})
    .rotate()
    .resize(MAX, MAX, {
      fit: 'cover',
      position: 'center',
      withoutEnlargement: true,
    })
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer({ resolveWithObject: true })
      
  console.log('Resized image to:', info.width, info.height)

  // Filename (force .jpg)
  const safeBase =
    file.name.replace(/\.[^/.]+$/, '').replace(/[^\w\-]+/g, '') || 'image'
  const filename = `${Date.now()}-${safeBase}.jpg`
  const dir = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(dir, { recursive: true })
  const filepath = path.join(dir, filename)

  await writeFile(filepath, data)

  const url = `/uploads/${filename}`
  return NextResponse.json({ url, width: info.width, height: info.height })
}