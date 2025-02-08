'use client'

// Importing the function to delete todos.
import { completeTodo, uncompleteTodo } from "@/app/actions/todos";
import Image from "next/image";
import uncompleteIcon from "../unchecked.svg";
import completeIcon from "../checked.svg";

// Define the props that the TodoDelete component expects.
interface TodoCompleteProps {
    id: string, // The ID of the todo to delete.
    completed: boolean
}

export default function TodoComplete({ id, completed }: TodoCompleteProps) {
    // Define the action to perform when the form is submitted.
    // This is how we do it if we omit the bind from the server action
    const completeAction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the form from being submitted in the traditional way.
        
        // Complete or uncomplete the todo with the given ID.
        if (completed) {
            uncompleteTodo(id);
            return;
        }
        completeTodo(id)
    };

    // Render a form with a single submit button. When the button is clicked, the form is submitted 
    // and the deleteAction is performed.
    return <form onSubmit={completeAction} className="w-full">
        <button type="submit">
            {completed ? 
                <Image src={completeIcon} alt="Complete" width={48} height={48}/> : 
                <Image src={uncompleteIcon} alt="Uncomplete" width={48} height={48}/>}
        </button>
    </form>
}
