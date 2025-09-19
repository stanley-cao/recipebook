'use client'

import { use } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import type { pageRecipeQuery } from './__generated__/pageRecipeQuery.graphql'
import DeleteButton from './DeleteButton'

const RecipeQuery = graphql`
  query pageRecipeQuery($id: ID!) {
    recipe(id: $id) {
      id
      title
      description
      coverImage
      images
      tags                # now [String!] (scalar) — no sub-selections
      estimatedMinutes
      ingredients { id name quantity }
      steps { id index text imageUrl }
      createdAt
      updatedAt
    }
  }
`

export default function RecipePage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = use(params) // unwrap Promise (Next 15)
  const data = useLazyLoadQuery<pageRecipeQuery>(RecipeQuery, { id })

  if (!data.recipe) return <div className="container">Not found</div>
  const r = data.recipe

  return (
    <main className="container">
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <h1 className="recipe-title" style={{ fontSize: 28, margin: 0 }}>{r.title}</h1>
          <DeleteButton id={r.id} />
        </div>

        {r.coverImage && (
          <img
            src={r.coverImage}
            alt=""
            style={{ width: '100%', maxWidth: 720, marginTop: 12, borderRadius: 8 }}
          />
        )}

        {r.description && (
          <p className="recipe-desc" style={{ marginTop: 12 }}>{r.description}</p>
        )}

        {typeof r.estimatedMinutes === 'number' && (
          <p style={{ marginTop: 6, opacity: 0.8 }}>
            ~{r.estimatedMinutes} min
          </p>
        )}

        {r.tags?.length ? (
          <div className="badges" style={{ marginTop: 12 }}>
            {r.tags.map(t => (
              <span key={t} className="badge">#{t}</span>
            ))}
          </div>
        ) : null}

        <h3 className="section" style={{ marginTop: 22 }}>Ingredients</h3>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {r.ingredients.map(i => (
            <li key={i.id}>
              {i.quantity ? `${i.quantity} ` : ''}{i.name}
            </li>
          ))}
        </ul>

        <h3 className="section" style={{ marginTop: 22 }}>Steps</h3>
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          {r.steps
            .slice()
            .sort((a, b) => a.index - b.index)
            .map(s => (
              <li key={s.id} style={{ marginBottom: 6 }}>{s.text}</li>
            ))}
        </ol>
      </div>
    </main>
  )
}