'use client'
import { RelayEnvironmentProvider } from 'react-relay'
import { RelayEnvironment } from '@/lib/relay/RelayEnvironment'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  )
}