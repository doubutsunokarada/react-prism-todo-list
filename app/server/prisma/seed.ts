import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.upsert({
    where: { id: "incompletetask1" },
    update: {},
    create: {
      content: "Incomplete Task 1.",
      done: false,
    },
  });

  await prisma.todo.upsert({
    where: { id: "incompletetask2" },
    update: {},
    create: {
      content: "Incomplete Task 2.",
      done: false,
    },
  });

  await prisma.todo.upsert({
    where: { id: "completedtask1" },
    update: {},
    create: {
      content: "Completed Task 1.",
      done: true,
    },
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
