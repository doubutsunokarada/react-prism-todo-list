import resetDatabase from "../utils/resetDatabase";
import supertest from "supertest";
import app from "../app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function createUuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
    let r = (new Date().getTime() + Math.random() * 16) % 16 | 0,
      v = a == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

describe("TodoController test", () => {
  beforeEach(async () => {
    await resetDatabase();
  }, 30000);
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /todos", () => {
    test("response with success", async () => {
      for (let i = 0; i < 7; i++) {
        await prisma.todo.create({
          data: {
            content: Math.random().toString(32).substring(2),
            done: Math.random() < 0.5,
          },
        });
      }
      const todos = await prisma.todo.findMany();
      const response = await supertest(app).get("/todos");
      expect(response.status).toBe(200);
      expect(response.body.todos).toEqual(todos);
    });
  });

  describe("POST /todos", () => {
    test("response with success", async () => {
      const body = {
        id: createUuid(),
        content: Math.random().toString(32).substring(2),
        done: Math.random() < 0.5,
      };
      const response = await supertest(app).post("/todos").send(body);
      expect(response.status).toBe(200);
      expect(response.body.todo).toEqual(body);

      const todos = await prisma.todo.findMany();
      expect(todos.length).toBe(1);
    });
  });

  describe("PUT /todos/:id", () => {
    test("response with success", async () => {
      const id = createUuid();
      const flg = Math.random() < 0.5;
      await prisma.todo.create({
        data: {
          id: id,
          content: Math.random().toString(32).substring(2),
          done: flg,
        },
      });
      const body = {
        content: Math.random().toString(32).substring(2),
        done: !flg,
      };
      const response = await supertest(app).put(`/todos/${id}`).send(body);
      expect(response.status).toBe(200);
      expect(response.body.todo.content).toEqual(body.content);
      expect(response.body.todo.done).toEqual(body.done);

      const after = await prisma.todo.findUnique({ where: { id: id } });
      expect(after?.content).toEqual(body.content);
      expect(after?.done).toEqual(body.done);
    });
  });
});
