import Link from 'next/link'
import RecipesClient from './RecipeClient'
import HeadingWithName from './components/HeadingWithName'

type SearchParams = Record<string, string | string[] | undefined> | undefined

function normalizeTags(sp: SearchParams): string[] | undefined {
  const raw = sp?.tags
  const list = Array.isArray(raw) ? raw.join(',') : (raw ?? '')
  const tags = list.split(',').map(t => t.trim()).filter(Boolean)
  return tags.length ? tags : undefined
}

export default function Page({ searchParams }: { searchParams?: SearchParams }) {
  const initialTags = normalizeTags(searchParams)

  return (
    <main className="container">
      <div className="page-head">
        {/* Dynamic heading that shows "Alex's Recipes" */}
        <HeadingWithName fallback="Recipes" />

        {/* + New button */}
        <Link href="/new" className="btn">
          + New
        </Link>
      </div>

      <RecipesClient initialTags={initialTags} />
    </main>
  )
}