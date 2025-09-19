'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { getStoredName, setStoredName } from '@/lib/displayName'

type Ctx = { name: string | null; setName: (n: string) => void; ready: boolean }
const NameCtx = createContext<Ctx | null>(null)

export function NameProvider({ children }: { children: React.ReactNode }) {
  const [name, setNameState] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => { setNameState(getStoredName()); setReady(true) }, [])
  const setName = (n: string) => { setStoredName(n); setNameState(n) }

  return <NameCtx.Provider value={{ name, setName, ready }}>{children}</NameCtx.Provider>
}

export function useDisplayName() {
  const ctx = useContext(NameCtx)
  if (!ctx) throw new Error('useDisplayName must be used inside <NameProvider>')
  return ctx
}