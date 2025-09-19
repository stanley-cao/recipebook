import { createYoga, createSchema } from 'graphql-yoga'
import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

const typeDefs = /* GraphQL */ `
  scalar DateTime

  type Ingredient { id: ID!, name: String!, quantity: String }
  type Step { id: ID!, index: Int!, text: String!, imageUrl: String }

  type Recipe {
    id: ID!
    title: String!
    slug: String
    description: String
    coverImage: String
    images: [String!]!
    tags: [String!]!
    estimatedMinutes: Int
    steps: [Step!]!
    ingredients: [Ingredient!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input NewIngredient { name: String!, quantity: String }
  input NewStep { index: Int!, text: String!, imageUrl: String }
  input NewRecipe {
    title: String!
    slug: String
    description: String
    coverImage: String
    images: [String!]
    tags: [String!]
    estimatedMinutes: Int
    ingredients: [NewIngredient!]!
    steps: [NewStep!]!
  }

  type Query {
    recipes(tags: [String!]): [Recipe!]!
    recipe(id: ID!): Recipe
  }

  type Mutation {
    addRecipe(input: NewRecipe!): Recipe!
    deleteRecipe(id: ID!): Boolean!
  }
`

const resolvers = {
  Query: {
    recipes: async (_: any, { tags }: { tags?: string[] }) => {
      return prisma.recipe.findMany({
        where: tags?.length ? { tags: { hasSome: tags } } : {},
        include: { steps: true, ingredients: true },
        orderBy: { createdAt: 'desc' },
      })
    },
    recipe: (_: any, { id }: { id: string }) =>
      prisma.recipe.findUnique({
        where: { id },
        include: { steps: true, ingredients: true },
      }),
  },
  Mutation: {
    addRecipe: async (_: any, { input }: any) => {
      try {
        return prisma.recipe.create({
          data: {
            title: input.title,
            slug: input.slug,
            description: input.description,
            coverImage: input.coverImage,
            images: input.images ?? [],
            tags: input.tags ?? [],
            estimatedMinutes: input.estimatedMinutes,
            ingredients: { create: input.ingredients },
            steps: { create: input.steps },
          },
          include: { steps: true, ingredients: true },
        })
      } catch (err: any) {
        console.error('addRecipe failed:', err)
        throw new GraphQLError(err?.message || 'addRecipe failed')
      }
    },
    deleteRecipe: async (_: unknown, { id }: { id: string }) => {
      await prisma.recipe.delete({ where: { id } })
      return true
    },
  },
}

const yoga = createYoga<{ req: NextRequest }>({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: '/api/graphql',
})

export { yoga as GET, yoga as POST }