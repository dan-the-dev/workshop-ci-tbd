import { createTodo } from "@/app/actions/todos"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

describe('todos action tests', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('creates TODO correctly', async () => {
    await prisma.$transaction(async () => {
      const formData = new FormData();
      formData.append("name", "TODO TEST 1");
      formData.append("description", "This is a sample description");
  
      expect(await createTodo({ errors: {} }, formData)).toBeUndefined();
    });
  })
})