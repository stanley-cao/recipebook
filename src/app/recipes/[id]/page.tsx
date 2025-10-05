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
      tags
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
  const { id } = use(params)
  const data = useLazyLoadQuery<pageRecipeQuery>(RecipeQuery, { id })

  if (!data.recipe) return <div className="container">Not found</div>
  const r = data.recipe

  return (
    <main className="container">
      <div className="card recipe-content">
        {/* Title + Image centered */}
        <header className="recipe-hero">
          <h1 className="recipe-title" style={{ fontSize: 28, margin: 0 }}>
            {r.title}
          </h1>

          {r.coverImage && (
            <img
              src={r.coverImage}
              alt={r.title || 'Recipe image'}
              className="recipe-thumb"
            />
          )}
        </header>

        {/* Body (left-aligned) */}
        {r.description && (
          <p className="recipe-desc" style={{ marginTop: 12 }}>
            {r.description}
          </p>
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
              <li key={s.id} style={{ marginBottom: 6 }}>
                {s.text}
              </li>
            ))}
        </ol>

        {/* Delete button centered */}
        <div className="center-row" style={{ marginTop: 16 }}>
          <DeleteButton id={r.id} />
        </div>
      </div>
    </main>
  )
}