// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear out old data first (so it's repeatable during dev)
  await prisma.recipe.deleteMany();

  // Seed a sample recipe
  const recipe = await prisma.recipe.create({
    data: {
      title: 'Quick Avocado Toast',
      slug: 'quick-avocado-toast',
      description: 'Simple and tasty breakfast',
      coverImage: null,
      images: [],
      tags: ['vegan', 'quick'],
      estimatedMinutes: 5,
      ingredients: {
        create: [
          { name: 'Bread', quantity: '2 slices' },
          { name: 'Avocado', quantity: '1 ripe' },
          { name: 'Salt', quantity: 'to taste' },
        ],
      },
      steps: {
        create: [
          { index: 1, text: 'Toast bread' },
          { index: 2, text: 'Mash avocado and spread' },
          { index: 3, text: 'Sprinkle salt on top' },
        ],
      },
    },
    include: { steps: true, ingredients: true },
  });

  console.log('Seeded recipe:', recipe.title);
}

main().finally(() => prisma.$disconnect());