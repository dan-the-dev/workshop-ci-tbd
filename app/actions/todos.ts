/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

// Import the database client and the Todo type from Prisma
import { db } from '@/db'
import type { Todo } from '@prisma/client'

// Import the revalidatePath and redirect functions from Next.js
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Import the Zod library for validation
import { z } from 'zod'

// Define a schema for the todo using Zod
const todoSchema = z.object({
    // the name must be a string between 3 and 255 characters
    name: z.string().min(3).max(255),
    // the description must be a string between 10 and 4000 characters
    description: z.string().min(10).max(4000),
})

// Define an interface for the form state
interface TodoFormState {
    errors: {
        name?: string[],
        description?: string[],
        _form?: string[],
    }
}

// Define an asynchronous function to create a todo
export async function createTodo(
    formState: TodoFormState,
    formData: FormData
): Promise<TodoFormState> {
    // Validate the form data against the todo schema
    // If the form data does not match the schema, the safeParse method returns an object 
    // with a success property of false and an error property containing the validation errors. 
    // If the form data matches the schema, the safeParse method returns an object 
    // with a success property of true and a data property containing the validated data. 
    const result = todoSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    })

    // If validation fails, return the errors
    if (!result.success) {
        return {
            // The flatten method is used to convert the validation errors into a flat object structure 
            // that can be easily displayed in the form.
            errors: result.error.flatten().fieldErrors
        }
    }

    let todo: Todo
    try {
        // If validation passes, create a new todo in the database
        todo = await db.todo.create({
            data: {
                name: result.data.name,
                description: result.data.description,
            }
        })
    } catch (error: unknown) {
        // If there's an error, return it
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    // Revalidate the path and redirect to the home page
    revalidatePath('/')
    redirect('/')
}

export async function updateTodo(
    id: string,
    formState: TodoFormState,
    formData: FormData
): Promise<TodoFormState> {
    const result = todoSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let todo: Todo
    try {
        todo = await db.todo.update({
            where: { id },
            data: {
                name: result.data.name,
                description: result.data.description,
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/')
    redirect('/')
}

export async function deleteTodo(
    id: string,
): Promise<TodoFormState> {
    let todo: Todo
    try {
        todo = await db.todo.delete({
            where: { id },
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/')
    redirect('/')
}

export async function completeTodo(
    id: string,
): Promise<TodoFormState> {
    return updateCompletedAt(id, new Date())
}

export async function uncompleteTodo(
    id: string,
): Promise<TodoFormState> {
    return updateCompletedAt(id, null)
}

async function updateCompletedAt(
    id: string,
    value: Date | null,
): Promise<TodoFormState> {
    let todo: Todo
    try {
        todo = await db.todo.update({
            where: { id },
            data: {
                completedAt: value,
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/')
    redirect('/')
}
