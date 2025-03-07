'use client'

// Importing the function to delete todos.
import { deleteTodo } from "@/app/actions/todos";
import { redirect } from 'next/navigation';

// Define the props that the TodoDelete component expects.
interface TodoDeleteProps {
    id: string, // The ID of the todo to delete.
}

export default function TodoDelete({ id }: TodoDeleteProps) {
    // Define the action to perform when the form is submitted.
    // This is how we do it if we omit the bind from the server action
    const deleteAction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the form from being submitted in the traditional way.

        if (confirm('Are you sure you want to delete this todo?')){
            deleteTodo(id); // Delete the todo with the given ID.
            redirect('/')
        }
    };

    // Render a form with a single submit button. When the button is clicked, the form is submitted 
    // and the deleteAction is performed.
    return <form onSubmit={deleteAction} className="w-full">
        <button type="submit" data-testid="delete">Delete</button>
    </form>
}
