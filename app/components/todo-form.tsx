'use client'

import Link from "next/link"
import { useActionState } from "react"

// Define the shape of the form errors
interface FormErrors {
    name?: string[],
    description?: string[],
}

// Define the shape of the form state
interface FormState {
    errors: FormErrors,
}

// Define the props that the TodoForm component expects
interface TodoFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formAction: any, // The action to perform when the form is submitted
    initialData: { // The initial data for the form fields
        name: string,
        description: string,
    },
}

// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields. 
export default function TodoForm({ formAction, initialData }: TodoFormProps) {
    // Initialize the form state and action
    const [formState, action] = useActionState<FormState>(formAction, {
        errors: {},
    })
    console.log(formState)

    return <>
        <h1 className="text-3xl font-bold mb-6">{initialData.name ? 'Update' : 'Create'} Todo</h1>
        <form action={action}>
            <div className="w-96">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input type="text" id="name" name="name" defaultValue={initialData.name} className="rounded p-2 w-full text-black" />
                    {
                        formState.errors.name
                        && <div className="text-red-500">
                            {formState.errors.name?.join(', ')}
                        </div>
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">Description</label>
                    <textarea id="description" name="description" defaultValue={initialData.description} className="rounded p-2 w-full text-black"></textarea>
                    {
                        formState.errors.description
                        && <div className="text-red-500">
                            {formState.errors.description?.join(', ')}
                        </div>
                    }
                </div>
                <div className="mb-4">
                    <button type="submit" className="bg-blue px-4 py-2 rounded mr-2">Save</button>
                    <Link href="/" className="bg-red px-4 py-2 rounded">Cancel</Link>
                </div>
            </div>
        </form>
    </>
}
