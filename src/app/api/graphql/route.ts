import { createYoga, createSchema } from 'graphql-yoga'
import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient()

const typeDefs = /* GraphQL */ `
  scalar DateTime

  type User { id: ID!, name: String, image: String, email: String! }
  type Ingredient { id: ID!, name: String!, quantity: String }
  type Step { id: ID!, index: Int!, text: String!, imageUrl: String }
  type Tag { id: ID!, name: String! }

  type Comment {
    id: ID!
    text: String!
    author: User!
    createdAt: DateTime!
  }

  type Like { id: ID!, user: User! }

  type Recipe {
    id: ID!
    title: String!
    description: String
    coverImage: String
    author: User!
    ingredients: [Ingredient!]!
    steps: [Step!]!
    tags: [Tag!]!
    comments(first: Int = 20, after: String): CommentConnection!
    likesCount: Int!
    createdAt: DateTime!
  }

  type CommentEdge { node: Comment!, cursor: String! }
  type PageInfo { endCursor: String, hasNextPage: Boolean! }
  type CommentConnection { edges: [CommentEdge!]!, pageInfo: PageInfo! }

  type RecipeEdge { node: Recipe!, cursor: String! }
  type RecipeConnection { edges: [RecipeEdge!]!, pageInfo: PageInfo! }

  input NewIngredient { name: String!, quantity: String }
  input NewStep { index: Int!, text: String!, imageUrl: String }
  input NewRecipe {
    title: String!
    description: String
    coverImage: String
    ingredients: [NewIngredient!]!
    steps: [NewStep!]!
    tagNames: [String!]!
  }

  type Query {
    recipes(first: Int = 20, after: String, tags: [String!]): RecipeConnection!
    recipe(id: ID!): Recipe
  }

  type Mutation {
    addRecipe(input: NewRecipe!): Recipe!
    addComment(recipeId: ID!, text: String!): Comment!
    toggleLike(recipeId: ID!): Boolean!
  }
`

const resolvers = {
  Recipe: {
    author: (r: any) => prisma.user.findUnique({ where: { id: r.authorId } }),
    ingredients: (r: any) => prisma.ingredient.findMany({ where: { recipeId: r.id } }),
    steps: (r: any) => prisma.step.findMany({ where: { recipeId: r.id }, orderBy: { index: 'asc' } }),
    tags: async (r: any) => {
      const many = await prisma.recipeTag.findMany({ where: { recipeId: r.id }, include: { tag: true } })
      return many.map(m => m.tag)
    },
    comments: async (r: any, { first, after }: any) => {
      const take = first ?? 20
      const cursor = after ? { id: after } : undefined
      const results = await prisma.comment.findMany({
        where: { recipeId: r.id },
        take: take + 1, cursor, skip: cursor ? 1 : 0,
        orderBy: { createdAt: 'desc' },
        include: { author: true }
      })
      const hasNextPage = results.length > take
      const items = hasNextPage ? results.slice(0, -1) : results
      return {
        edges: items.map(c => ({ node: c, cursor: c.id })),
        pageInfo: { endCursor: items.at(-1)?.id, hasNextPage }
      }
    },
    likesCount: (r: any) => prisma.like.count({ where: { recipeId: r.id } }),
  },
  Comment: {
    author: (c: any) => prisma.user.findUnique({ where: { id: c.authorId } })
  },
  Query: {
    recipes: async (_: any, { first, after, tags }: any) => {
      const take = first ?? 20
      const cursor = after ? { id: after } : undefined
      const where = tags?.length
        ? { tags: { some: { tag: { name: { in: tags } } } } }
        : {}
      const results = await prisma.recipe.findMany({
        where,
        take: take + 1, cursor, skip: cursor ? 1 : 0,
        orderBy: { createdAt: 'desc' }
      })
      const hasNextPage = results.length > take
      const items = hasNextPage ? results.slice(0, -1) : results
      return {
        edges: items.map(r => ({ node: r, cursor: r.id })),
        pageInfo: { endCursor: items.at(-1)?.id, hasNextPage }
      }
    },
    recipe: (_: any, { id }: any) =>
      prisma.recipe.findUnique({ where: { id } })
  },
  Mutation: {
    addRecipe: async (_: any, { input }: any, ctx: any) => {
      const userId = ctx.userId ?? (await ensureDemoUser()).id // stub auth
      const tags = await Promise.all(
        input.tagNames.map((name: string) =>
          prisma.tag.upsert({ where: { name }, update: {}, create: { name } })
        )
      )
      return prisma.recipe.create({
        data: {
          title: input.title,
          description: input.description,
          coverImage: input.coverImage,
          authorId: userId,
          ingredients: { create: input.ingredients },
          steps: { create: input.steps },
          tags: { create: tags.map(t => ({ tagId: t.id })) }
        }
      })
    },
    addComment: async (_: any, { recipeId, text }: any, ctx: any) => {
      const userId = ctx.userId ?? (await ensureDemoUser()).id
      return prisma.comment.create({ data: { text, recipeId, authorId: userId } })
    },
    toggleLike: async (_: any, { recipeId }: any, ctx: any) => {
      const userId = ctx.userId ?? (await ensureDemoUser()).id
      const existing = await prisma.like.findFirst({ where: { recipeId, userId } })
      if (existing) {
        await prisma.like.delete({ where: { id: existing.id } })
        return false
      }
      await prisma.like.create({ data: { recipeId, userId } })
      return true
    }
  }
}

async function ensureDemoUser() {
  const { PrismaClient } = await import('@prisma/client')
  const p = new PrismaClient()
  return p.user.upsert({
    where: { email: 'demo@demo.dev' },
    update: {},
    create: { email: 'demo@demo.dev', name: 'Demo' }
  })
}

const yoga = createYoga<{
  req: NextRequest
}>({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: '/api/graphql',
})

export { yoga as GET, yoga as POST }