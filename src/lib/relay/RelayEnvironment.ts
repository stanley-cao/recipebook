'use client'
import {
  Environment, Network, RecordSource, Store,
  type RequestParameters, type Variables,
} from 'relay-runtime'

const BASE =
  process.env.NEXT_PUBLIC_BASE_URL /* set in .env */ ||
  'http://localhost:3000'          /* safe default for dev */

function fetchGraphQL(params: RequestParameters, variables: Variables) {
  if (!params.text) throw new Error('Missing query text')
  // Always use an absolute URL — works on both server and browser
  const url = `${BASE}/api/graphql`
  return fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: params.text, variables }),
  }).then(r => r.json())
}

export const RelayEnvironment = new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
})