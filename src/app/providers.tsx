'use client'
import { ReactNode } from 'react'
import { RelayEnvironmentProvider } from 'react-relay'
import { RelayEnvironment } from '@/lib/relay/RelayEnvironment'
import { NameProvider } from './name-context'


export default function Providers({ children }: { children: ReactNode }) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <NameProvider>{children}</NameProvider>
    </RelayEnvironmentProvider>
  )
}