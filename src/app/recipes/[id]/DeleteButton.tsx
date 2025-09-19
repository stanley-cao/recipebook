'use client'
import { graphql, useMutation } from 'react-relay'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import type { DeleteButtonMutation } from './__generated__/DeleteButtonMutation.graphql'

const mutation = graphql`
  mutation DeleteButtonMutation($id: ID!) {
    deleteRecipe(id: $id)   # returns Boolean
  }
`

export default function DeleteButton({ id }: { id: string }) {
  const [commit, isInFlight] = useMutation<DeleteButtonMutation>(mutation)
  const router = useRouter()

  const onDelete = () => {
    if (!confirm('Delete this recipe?')) return
    commit({
      variables: { id },
      onCompleted: (res) => {
        if (res.deleteRecipe) {
          startTransition(() => {
            router.push('/')
            router.refresh()
          })
        } else {
          alert('Delete failed')
        }
      },
      onError: (err) => {
        console.error('deleteRecipe error:', err)
        alert(`Failed to delete: ${err.message}`)
      },
    })
  }

  return (
    <button className="btn danger" onClick={onDelete} disabled={isInFlight}>
      {isInFlight ? 'Deleting…' : 'Delete'}
    </button>
  )
}