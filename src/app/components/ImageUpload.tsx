/*'use client'

import { useState } from 'react'

export default function ImageUpload({
  value,
  onChange,
}: {
  value: string
  onChange: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      // Example: if you’re using S3 + /api/upload
      const resp = await fetch(`/api/upload?contentType=${encodeURIComponent(file.type)}`)
      const { url, fields, publicUrl } = await resp.json()

      const data = new FormData()
      Object.entries(fields).forEach(([k, v]) => data.append(k, v as string))
      data.append('file', file)
      const upload = await fetch(url, { method: 'POST', body: data })
      if (!upload.ok) throw new Error('Upload failed')

      onChange(publicUrl)
    } catch (err: any) {
      setError(err.message ?? 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {value && <img src={value} alt="cover" style={{ maxWidth: 320, borderRadius: 8 }} />}
      <input type="file" accept="image/*" onChange={handleFile} />
      {uploading && <div>Uploading…</div>}
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      {value && (
        <button type="button" className="btn" onClick={() => onChange('')}>
          Remove
        </button>
      )}
    </div>
  )
}*/
'use client'

import { useState } from 'react'

async function uploadFile(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch('/api/upload', { method: 'POST', body: formData })
  if (!res.ok) throw new Error(await res.text().catch(()=>'Upload failed'))
  const json = await res.json()
  console.log('Resized to:', json.width, 'x', json.height) // 👈 verify
  return json.url as string
}

export default function ImageUpload({
  value,
  onChange,
}: {
  value: string
  onChange: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const url = await uploadFile(file)
      onChange(url)
    } catch (err: any) {
      setError(err?.message ?? 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {value && (
        <img
          src={value}
          alt="cover"
          style={{ maxWidth: 320, borderRadius: 8, border: '1px solid #222' }}
        />
      )}

      <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />

      {uploading && <div>Uploading…</div>}
      {error && <div style={{ color: 'crimson' }}>{error}</div>}

      {value && (
        <button type="button" className="btn" onClick={() => onChange('')}>
          Remove
        </button>
      )}
    </div>
  )
}