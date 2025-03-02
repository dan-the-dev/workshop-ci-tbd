import { updateTodo } from "@/app/actions/todos";
import TodoForm from "@/app/components/todo-form";
import { fetchTodoById } from "@/db/queries/todos";

interface TodosEditProps {
    params: {
        id: string;
    };
}

// Defining a new page, server component TodosEdit
export default async function TodosEdit({ params }: TodosEditProps) {
    // Receives params as a prop, which includes the id of the todo to be edited.
    const { id } = params;

    // Fetches the todo from the database
    const todo = await fetchTodoById(id)

    // binds the id to the updateTodo action to create an updateAction, 
    const updateAction = updateTodo.bind(null, id)

    return (
        <TodoForm formAction={updateAction} initialData={{ name: todo?.name ?? '', description: todo?.description ?? '' }} />
    );
}
