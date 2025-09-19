/*import { NextRequest, NextResponse } from 'next/server'
import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const contentType = searchParams.get('contentType') || 'image/jpeg'
  const ext = contentType.split('/')[1] || 'jpg'
  const key = `recipes/${randomUUID()}.${ext}`

  const { url, fields } = await createPresignedPost(s3, {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Conditions: [
      ['content-length-range', 0, 10_000_000], // up to ~10MB
      ['starts-with', '$Content-Type', contentType.split('/')[0]],
    ],
    Fields: { 'Content-Type': contentType },
    Expires: 60, // seconds
  })

  const publicUrl =
    `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

  return NextResponse.json({ url, fields, key, publicUrl })
}*/

// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  // Read bytes
  const bytes = Buffer.from(await file.arrayBuffer())

  // Normalize + resize with sharp
  const maxW = 800
  const maxH = 800

  const image = sharp(bytes, { failOn: 'none' }).rotate() // auto-orient
  const { data, info } = await image
    .resize(maxW, maxH, { fit: 'inside', withoutEnlargement: true })
    .toFormat('jpeg', { quality: 80, mozjpeg: true })
    .toBuffer({ resolveWithObject: true })

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