'use client'
import { graphql, useMutation } from 'react-relay'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { page_AddRecipeMutation } from './__generated__/page_AddRecipeMutation.graphql'

const AddRecipe = graphql`
  mutation page_AddRecipeMutation($input: NewRecipe!) {
    addRecipe(input: $input) { id }
  }
`

export default function NewRecipe() {
  const [commit, isInFlight] = useMutation<page_AddRecipeMutation>(AddRecipe)
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [tags, setTags] = useState('quick,vegan')

  const toArray = (s: string) => s.split(',').map(t => t.trim()).filter(Boolean)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = {
      title,
      description: desc,
      coverImage: null as string | null,
      ingredients: [{ name: 'Example ingredient' }],
      steps: [{ index: 1, text: 'Example step' }],
      tagNames: toArray(tags),
    }
    commit({
      variables: { input },
      onCompleted: (res) => {
        router.push(`/recipes/${res.addRecipe.id}`)
      },
    })
  }

  return (
    <main className="container">
      <div className="card" style={{ padding: 24 }}>
        <h1 className="page-title">New Recipe</h1>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 640 }}>
          <input
            className="input"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="input"
            placeholder="Description"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            rows={4}
          />
          <input
            className="input"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
          <button className="btn" disabled={isInFlight} type="submit">Create</button>
        </form>
      </div>
    </main>
  )
}