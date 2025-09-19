'use client'

import { graphql, useLazyLoadQuery } from 'react-relay'
import Link from 'next/link'
import type { RecipeClientQuery } from './__generated__/RecipeClientQuery.graphql'

const RecipesQuery = graphql`
  query RecipeClientQuery($tags: [String!]) {
    recipes(tags: $tags) {
      id
      title
      description
      coverImage
      tags
      estimatedMinutes
    }
  }
`

export default function RecipesClient({
  initialTags,
}: {
  initialTags?: string[]
}) {
  const data = useLazyLoadQuery<RecipeClientQuery>(
    RecipesQuery,
    { tags: initialTags ?? null },
    { fetchPolicy: 'store-and-network' }
  )

  const items = data.recipes ?? []
  const hasResults = items.length > 0
  const hasFilter = !!initialTags?.length

  const removeTagHref = (t: string) => {
    const p = new URLSearchParams()
    const next = (initialTags ?? []).filter(x => x !== t)
    if (next.length) p.set('tags', next.join(','))
    const qs = p.toString()
    return qs ? `/?${qs}` : '/'
  }

  return (
    <>
      {/* Filter toolbar (no page header or +New here) */}
      <form method="GET" className="toolbar sticky" style={{ marginTop: 24 }}>
        <div className="input with-icon" style={{ maxWidth: 420 }}>
          <span className="input-icon" aria-hidden>🔎</span>
          <input
            aria-label="Filter by tags"
            name="tags"
            placeholder="comma-separated tags (e.g. vegan,quick)"
            defaultValue={initialTags?.join(',') ?? ''}
          />
        </div>
        <button className="btn secondary" type="submit">Filter</button>
      </form>

      {hasFilter && (
        <div className="chips">
          {initialTags!.map((t) => (
            <Link key={t} href={removeTagHref(t)} className="chip" prefetch={false}>
              <span className="dot" />{t}
              <span className="x" aria-hidden>×</span>
              <span className="sr-only">Remove {t}</span>
            </Link>
          ))}
        </div>
      )}

      {hasResults ? (
        <div className="list grid">
          {items.map((r) => (
            <article key={r.id} className="card recipe">
              <Link href={`/recipes/${r.id}`} className="recipe-title">
                {r.title}
              </Link>
              <p className="recipe-desc">{r.description}</p>
              <div className="card-foot">
                <Link className="ghost-link" href={`/recipes/${r.id}`}>View →</Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty">
          <div className="empty-ill">🍽️</div>
          <h2>No recipes match your filter</h2>
          <p>Try different tags or add your first recipe.</p>
          <div className="empty-actions">
            <Link href="/" className="btn secondary">Clear filter</Link>
            <Link href="/new" className="btn">+ New</Link>
          </div>
        </div>
      )}
    </>
  )
}