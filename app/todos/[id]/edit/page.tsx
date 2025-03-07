import { TodoFormState, updateTodo } from "@/app/actions/todos";
import TodoForm from "@/app/components/todo-form";
import { fetchTodoById } from "@/db/queries/todos";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type TodosEditProps = Promise<{ id: string }>

// Defining a new page, server component TodosEdit
export default async function TodosEdit(props: { params: TodosEditProps }) {
    console.log(await props.params)
    // Receives params as a prop, which includes the id of the todo to be edited.
    const { id } = (await props.params);

    // Fetches the todo from the database
    const todo = await fetchTodoById(id)

    const updateAction = async (
        formState: TodoFormState,
        formData: FormData
    ) => {
        "use server"; // mark function as a server action
        
        await updateTodo(id, formState, formData);
        
        // Revalidate the path and redirect to the home page
        revalidatePath('/')
        redirect('/')
    };

    return (
        <TodoForm formAction={updateAction} initialData={{ name: todo?.name ?? '', description: todo?.description ?? '' }} />
    );
}
