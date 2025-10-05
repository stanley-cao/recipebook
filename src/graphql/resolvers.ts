// src/graphql/resolvers.ts
import { prisma } from '../lib/prisma'

export const resolvers = {
  Query: {
    recipes: async (_: any, { tags }: { tags?: string[] }) => {
      if (tags && tags.length) {
        return prisma.recipe.findMany({
          where: { tags: { hasEvery: tags } }
        })
      }
      return prisma.recipe.findMany()
    },
    recipe: (_: any, { id }: { id: string }) =>
      prisma.recipe.findUnique({ where: { id } }),

    availableTags: async () => {
      const recipes = await prisma.recipe.findMany({ select: { tags: true } })
      const allTags = recipes.flatMap(r => r.tags)
      return [...new Set(allTags)].sort()
    }
  },
  Mutation: {
    addRecipe: (_: any, { input }: any) =>
      prisma.recipe.create({
        data: {
          title: input.title,
          description: input.description,
          coverImage: input.coverImage,
          images: input.images || [],
          tags: input.tags || [],
          estimatedMinutes: input.estimatedMinutes,
          ingredients: { create: input.ingredients },
          steps: { create: input.steps }
        }
      }),
    deleteRecipe: (_: any, { id }: { id: string }) =>
      prisma.recipe.delete({ where: { id } })
        .then(() => true)
        .catch(() => false)
  }
}