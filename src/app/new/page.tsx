'use client'

import { graphql, useMutation } from 'react-relay'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import type { pageAddRecipeMutation } from './__generated__/pageAddRecipeMutation.graphql'
import ImageUpload from '../components/ImageUpload'

const AddRecipe = graphql`
  mutation pageAddRecipeMutation($input: NewRecipe!) {
    addRecipe(input: $input) { id }
  }
`

type IngredientRow = { name: string; quantity?: string }
type StepRow = { text: string }

export default function NewRecipePage() {
  const router = useRouter()
  const [commit, isInFlight] = useMutation<pageAddRecipeMutation>(AddRecipe)

  // form state
  const [title, setTitle] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [desc, setDesc] = useState('')
  const [estimatedMinutes, setEstimatedMinutes] = useState('')
  const [tags, setTags] = useState('') // comma-separated

  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    { name: '', quantity: '' },
  ])
  const [steps, setSteps] = useState<StepRow[]>([{ text: '' }])

  const addIngredient = () => setIngredients(p => [...p, { name: '', quantity: '' }])
  const removeIngredient = (i: number) =>
    setIngredients(p => (p.length > 1 ? p.filter((_, idx) => idx !== i) : p))

  const addStep = () => setSteps(p => [...p, { text: '' }])
  const removeStep = (i: number) =>
    setSteps(p => (p.length > 1 ? p.filter((_, idx) => idx !== i) : p))

  const toArray = (s: string) =>
    s.split(',').map(t => t.trim()).filter(Boolean)

  // simple validation
  const errors = useMemo(() => {
    const errs: string[] = []
    if (!title.trim()) errs.push('Name is required.')
    if (ingredients.some(i => !i.name.trim())) errs.push('Each ingredient needs a name.')
    if (steps.some(s => !s.text.trim())) errs.push('Each step needs text.')
    if (estimatedMinutes.trim()) {
      const n = Number(estimatedMinutes)
      if (!Number.isInteger(n) || n < 0) errs.push('Estimated time must be a non-negative integer.')
    }
    return errs
  }, [title, ingredients, steps, estimatedMinutes])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (errors.length) return alert(errors.join('\n'))

    const input = {
      title: title.trim(),
      description: desc.trim() || null,
      coverImage: coverImage.trim() || null,
      images: [], // CHANGED: optional, keep empty for now
      tags: toArray(tags), // CHANGED: was tagNames
      estimatedMinutes: estimatedMinutes.trim() ? Number(estimatedMinutes) : null,
      ingredients: ingredients
        .filter(i => i.name.trim())
        .map(i => ({ name: i.name.trim(), quantity: i.quantity?.trim() || null })),
      steps: steps
        .filter(s => s.text.trim())
        .map((s, idx) => ({ index: idx + 1, text: s.text.trim(), imageUrl: null as string | null })),
    }

    commit({
      variables: { input },
      onCompleted: (res) => {
        router.push(`/recipes/${res.addRecipe.id}`)
      },
      onError: (err) => {
        console.error(err)
        alert(`Failed to create recipe: ${err.message}`)
      },
    })
  }

  return (
    <main className="container">
      <div className="card" style={{ padding: 24, maxWidth: 760, margin: '0 auto' }}>
        <h1 className="page-title">New Recipe</h1>

        {errors.length > 0 && (
          <div className="alert" style={{ margin: '12px 0' }}>
            {errors.map((e, i) => <div key={i}>• {e}</div>)}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
          {/* Name */}
          <label>
            <div className="label">Name *</div>
            <input
              className="input"
              placeholder="e.g., Matcha Brownies"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </label>

          {/* Image URL */}
          <label>
            <div className="label">Image</div>
            <ImageUpload value={coverImage} onChange={setCoverImage} />
          </label>

          {/* Short description (optional) */}
          <label>
            <div className="label">Short description (optional)</div>
            <textarea
              className="input"
              placeholder="What makes this recipe special?"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={3}
            />
          </label>

          {/* Estimated time */}
          <label>
            <div className="label">Estimated time (minutes)</div>
            <input
              className="input"
              type="number"
              min={0}
              step={1}
              placeholder="e.g., 45"
              value={estimatedMinutes}
              onChange={e => setEstimatedMinutes(e.target.value)}
            />
          </label>

          {/* Ingredients */}
          <div>
            <div className="label">Ingredients *</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {ingredients.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: 8 }}>
                  <input
                    className="input"
                    placeholder="Name (e.g., Flour)"
                    value={row.name}
                    onChange={e => {
                      const v = e.target.value
                      setIngredients(prev => prev.map((r, idx) => idx === i ? { ...r, name: v } : r))
                    }}
                  />
                  <input
                    className="input"
                    placeholder="Quantity (e.g., 2 cups)"
                    value={row.quantity || ''}
                    onChange={e => {
                      const v = e.target.value
                      setIngredients(prev => prev.map((r, idx) => idx === i ? { ...r, quantity: v } : r))
                    }}
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={() => removeIngredient(i)}
                    disabled={ingredients.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div>
                <button type="button" className="btn" onClick={addIngredient}>
                  + Add ingredient
                </button>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div>
            <div className="label">Steps *</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {steps.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
                  <textarea
                    className="input"
                    rows={2}
                    placeholder={`Step ${i + 1}…`}
                    value={row.text}
                    onChange={e => {
                      const v = e.target.value
                      setSteps(prev => prev.map((r, idx) => idx === i ? { ...r, text: v } : r))
                    }}
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={() => removeStep(i)}
                    disabled={steps.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div>
                <button type="button" className="btn" onClick={addStep}>
                  + Add step
                </button>
              </div>
            </div>
          </div>

          {/* Tags */}
          <label>
            <div className="label">Tags (comma separated)</div>
            <input
              className="input"
              placeholder="vegan, dessert, quick"
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
          </label>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" disabled={isInFlight} type="submit">
              {isInFlight ? 'Creating…' : 'Create'}
            </button>
            <button type="button" className="btn" onClick={() => router.push('/')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}