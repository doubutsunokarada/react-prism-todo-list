import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (request, response) => {
  const todos = await prisma.todo.findMany();
  response.json({ todos });
});

router.post("/", async (request, response) => {
  const { content } = request.body;
  const todo = await prisma.todo.create({
    data: {
      content: content,
      done: false,
    },
  });
  response.json({ todo });
});

router.put("/:id", async (request, response) => {
  const { content, done } = request.body;
  const todo = await prisma.todo.update({
    where: { id: request.params.id },
    data: {
      content: content,
      done: done,
    },
  });
  response.json({ todo });
});

router.delete("/:id", async (request, response) => {
  const todo = await prisma.todo.update({
    where: { id: request.params.id },
    data: {
      deleted_at: new Date(),
    },
  });
  response.json({ todo });
});

export default router;
