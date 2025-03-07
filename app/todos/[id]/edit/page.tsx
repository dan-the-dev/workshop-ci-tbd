import { updateTodo } from "@/app/actions/todos";
import TodoForm from "@/app/components/todo-form";
import { fetchTodoById } from "@/db/queries/todos";

type TodosEditProps = Promise<{ params: { id: string } }>

// Defining a new page, server component TodosEdit
export default async function TodosEdit(props: { params: TodosEditProps }) {
    // Receives params as a prop, which includes the id of the todo to be edited.
    const { id } = (await props.params).params;

    // Fetches the todo from the database
    const todo = await fetchTodoById(id)

    // binds the id to the updateTodo action to create an updateAction, 
    const updateAction = updateTodo.bind(null, id)

    return (
        <TodoForm formAction={updateAction} initialData={{ name: todo?.name ?? '', description: todo?.description ?? '' }} />
    );
}
