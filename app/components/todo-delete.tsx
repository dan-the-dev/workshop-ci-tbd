'use client'

// Importing the function to delete todos.
import { deleteTodo } from "@/app/actions/todos";

// Define the props that the TodoDelete component expects.
interface TodoDeleteProps {
    id: string, // The ID of the todo to delete.
}

export default function TodoDelete({ id }: TodoDeleteProps) {
    // Define the action to perform when the form is submitted.
    // This is how we do it if we omit the bind from the server action
    const deleteAction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the form from being submitted in the traditional way.
        deleteTodo(id); // Delete the todo with the given ID.
    };

    // Render a form with a single submit button. When the button is clicked, the form is submitted 
    // and the deleteAction is performed.
    return <form onSubmit={deleteAction} className="w-full">
        <button type="submit" className="btn btn-outline btn-accent btn-xs btn-wide w-full">Delete</button>
    </form>
}
