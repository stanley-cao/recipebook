import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: { email: 'alice@example.com', name: 'Alice' },
  })

  const vegan = await prisma.tag.upsert({
    where: { name: 'vegan' }, update: {}, create: { name: 'vegan' }
  })
  const quick = await prisma.tag.upsert({
    where: { name: 'quick' }, update: {}, create: { name: 'quick' }
  })

  const r = await prisma.recipe.create({
    data: {
      title: 'Quick Avocado Toast',
      description: 'Simple and tasty breakfast',
      authorId: alice.id,
      ingredients: { create: [{ name: 'Bread' }, { name: 'Avocado' }, { name: 'Salt' }] },
      steps: { create: [{ index: 1, text: 'Toast bread' }, { index: 2, text: 'Mash avocado and spread' }] },
      tags: { create: [{ tagId: vegan.id }, { tagId: quick.id }] },
    },
  })
  console.log('Seeded recipe', r.id)
}
main().finally(() => prisma.$disconnect())