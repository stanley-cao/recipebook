'use client'
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay'
import { useState } from 'react'
import type { page_RecipeQuery } from './__generated__/page_RecipeQuery.graphql'
import type { page_ToggleLikeMutation } from './__generated__/page_ToggleLikeMutation.graphql'
import type { page_AddCommentMutation } from './__generated__/page_AddCommentMutation.graphql'

const RecipeQuery = graphql`
  query page_recipe_Query($id: ID!) {
    recipe(id: $id) {
      id title description coverImage
      author { name }
      ingredients { id name quantity }
      steps { id index text imageUrl }
      tags { id name }
      likesCount
      comments(first: 20) {
        edges { node { id text author { name } } }
      }
    }
  }
`

const LikeMutation = graphql`
  mutation page_ToggleLikeMutation($recipeId: ID!) {
    toggleLike(recipeId: $recipeId)
  }
`

const CommentMutation = graphql`
  mutation page_AddCommentMutation($recipeId: ID!, $text: String!) {
    addComment(recipeId: $recipeId, text: $text) { id text author { name } }
  }
`

export default function RecipePage({ params }: { params: { id: string }}) {
  const data = useLazyLoadQuery(RecipeQuery, { id: params.id })
  const [commitLike] = useMutation(LikeMutation)
  const [commitComment] = useMutation(CommentMutation)
  const [text, setText] = useState('')

  if (!data.recipe) return <div>Not found</div>
  const r = data.recipe

  return (
    <main className="container">
      <div className="card" style={{ padding: 24 }}>
        <h1 className="recipe-title" style={{ fontSize: 28 }}>{r.title}</h1>
        {r.description && <p className="recipe-desc" style={{ marginBottom: 16 }}>{r.description}</p>}
  
        {r.tags.length > 0 && (
          <div className="badges" style={{ marginBottom: 16 }}>
            {r.tags.map(t => <span key={t.id} className="badge">#{t.name}</span>)}
          </div>
        )}
  
        <h3 className="section">Ingredients</h3>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {r.ingredients.map(i => (
            <li key={i.id}>{i.quantity ? `${i.quantity} ` : ''}{i.name}</li>
          ))}
        </ul>
  
        <h3 className="section">Steps</h3>
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          {r.steps.map(s => <li key={s.id} style={{ marginBottom: 6 }}>{s.text}</li>)}
        </ol>
  
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button className="like" onClick={() => commitLike({ variables: { recipeId: r.id } })}>
            <span className="heart">❤️</span> Like ({r.likesCount})
          </button>
        </div>
  
        <h3 className="section" style={{ marginTop: 22 }}>Comments</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {r.comments.edges.map(e => (
            <li key={e.node.id} className="comment">
              <b>{e.node.author.name ?? 'Anon'}:</b> {e.node.text}
            </li>
          ))}
        </ul>
  
        <form
          onSubmit={e => {
            e.preventDefault()
            commitComment({
              variables: { recipeId: r.id, text },
              onCompleted: () => setText('')
            })
          }}
          style={{ display: 'flex', gap: 8, marginTop: 12 }}
        >
          <input className="input" value={text} onChange={e => setText(e.target.value)} placeholder="Add a comment…" />
          <button className="btn" type="submit">Send</button>
        </form>
      </div>
    </main>
  )
}