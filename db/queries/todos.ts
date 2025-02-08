import type { Todo } from '@prisma/client' // Importing the Todo type from the Prisma client library.
import { db } from '@/db'
import { notFound } from 'next/navigation' // Importing the notFound function from Next.js for handling 404 errors.

export async function fetchTodos(): Promise<Todo[]> {  // Function to fetch all todos from the database.
    return await db.todo.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            }
        ],
    })
}

export async function fetchTodoById(id: string): Promise<Todo | null> { // Function to fetch a single todo by its ID.
    const todo = await db.todo.findFirst({
        where: {
            id
        }
    })

    if (!todo) {
        notFound() // If the todo is not found, a 404 error is thrown.
    }

    return todo
}
