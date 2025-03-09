import { completeTodo, createTodo, deleteTodo, uncompleteTodo, updateTodo } from "@/app/actions/todos"
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
  
      const actualTodo = await createTodo({ errors: {} }, formData);
      expect(actualTodo.name).toBe('TODO TEST 1');
      expect(actualTodo.description).toBe('This is a sample description');
    });
  })

  it('creates TODO and update it correctly', async () => {
    await prisma.$transaction(async () => {
      const createFormData = new FormData();
      createFormData.append("name", "TODO TEST 1");
      createFormData.append("description", "This is a sample description");
  
      const createdTodo = await createTodo({ errors: {} }, createFormData);
      expect(createdTodo.name).toBe('TODO TEST 1');
      expect(createdTodo.description).toBe('This is a sample description');

      const updateFormData = new FormData();
      updateFormData.append("name", "new name");
      updateFormData.append("description", "new description");
  
      const updatedTodo = await updateTodo(createdTodo.id, { errors: {} }, updateFormData);
      expect(updatedTodo.name).toBe('new name');
      expect(updatedTodo.description).toBe('new description');
    });
  })

  it('creates TODO and delete it correctly', async () => {
    await prisma.$transaction(async () => {
      const createFormData = new FormData();
      createFormData.append("name", "TODO TEST 1");
      createFormData.append("description", "This is a sample description");
  
      const createdTodo = await createTodo({ errors: {} }, createFormData);
      expect(createdTodo.name).toBe('TODO TEST 1');
      expect(createdTodo.description).toBe('This is a sample description');
  
      expect(await deleteTodo(createdTodo.id)).toBeUndefined();
    });
  })

  it('creates TODO and complete it / uncomplete it correctly', async () => {
    await prisma.$transaction(async () => {
      const createFormData = new FormData();
      createFormData.append("name", "TODO TEST 1");
      createFormData.append("description", "This is a sample description");
  
      const createdTodo = await createTodo({ errors: {} }, createFormData);
      expect(createdTodo.name).toBe('TODO TEST 1');
      expect(createdTodo.description).toBe('This is a sample description');
  
      expect(await completeTodo(createdTodo.id)).toBeUndefined();
      expect(await uncompleteTodo(createdTodo.id)).toBeUndefined();
    });
  })
})