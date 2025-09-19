'use client'

import { useDisplayName } from '@/app/name-context'
import { possessive } from '@/lib/displayName'
import NameDialog from './NameDialog'

export default function HeadingWithName({
  fallback = 'Recipes',
  showDialog = true,
}: { fallback?: string; showDialog?: boolean }) {
  const { name, ready } = useDisplayName()
  const title = ready && name ? `${possessive(name)} Recipes` : fallback

  return (
    <>
      {showDialog && <NameDialog />} {/* first-run prompt */}
      <h1 className="page-title">{title}</h1>
    </>
  )
}