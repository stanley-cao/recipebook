'use client'
import { useEffect, useRef, useState } from 'react'
import { useDisplayName } from '@/app/name-context'

export default function NameDialog({
  open,
  onClose,
}: { open?: boolean; onClose?: () => void }) {
  const { name, setName, ready } = useDisplayName()
  const [internalOpen, setInternalOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-open only when "open" prop is undefined (first run)
  useEffect(() => {
    if (open === undefined && ready && !name) {
      setInternalOpen(true)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open, ready, name])

  const actuallyOpen = open ?? internalOpen
  const close = () => {
    if (open === undefined) setInternalOpen(false)
    onClose?.()
  }

  if (!actuallyOpen) return null

  return (
    <div role="dialog" aria-modal className="modal-backdrop">
      <div className="modal">
        <h2>What’s your name?</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const v = (inputRef.current?.value || '').trim()
            if (!v) return
            setName(v)
            close()
          }}
          style={{ display: 'grid', gap: 12 }}
        >
          <input ref={inputRef} className="input" placeholder="e.g., Alex" defaultValue={name ?? ''} />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" className="btn secondary" onClick={close}>Cancel</button>
            <button type="submit" className="btn">Save</button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .modal-backdrop{position:fixed;inset:0;background:#0008;display:grid;place-items:center;z-index:50}
        .modal{background:#111;border:1px solid #222;border-radius:10px;padding:20px;min-width:280px;max-width:90vw}
      `}</style>
    </div>
  )
}