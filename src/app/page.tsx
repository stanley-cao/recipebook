'use client'
import { graphql, useLazyLoadQuery } from 'react-relay'
import Link from 'next/link'
import type { page_RecipesQuery } from './__generated__/page_RecipesQuery.graphql'

const RecipesQuery = graphql`
  query page_RecipesQuery($first: Int!, $tags: [String!]) {
    recipes(first: $first, tags: $tags) {
      edges {
        node {
          id
          title
          description
          likesCount
        }
      }
    }
  }
`

export default function Home() {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const tags = params.get('tags')?.split(',') ?? undefined
  const data = useLazyLoadQuery(RecipesQuery, { first: 20, tags })

  return (
    <main className="container">
      <h1 className="page-title">Recipes</h1>
  
      <form method="GET" className="toolbar">
        <input
          className="input"
          name="tags"
          placeholder="comma-separated tags (e.g. vegan,quick)"
          defaultValue={params.get('tags') ?? ''}
          style={{ maxWidth: 360 }}
        />
        <button className="btn secondary" type="submit">Filter</button>
        <Link href="/new" className="btn">+ New</Link>
      </form>
  
      <div className="list">
        {data.recipes.edges.map(({ node }) => (
          <div key={node.id} className="card">
            <Link href={`/recipes/${node.id}`} className="recipe-title">{node.title}</Link>
            <p className="recipe-desc">{node.description}</p>
            <button className="like" type="button">
              <span className="heart">❤️</span> {node.likesCount}
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}