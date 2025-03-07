import { createTodo, TodoFormState } from "@/app/actions/todos";
import TodoForm from "@/app/components/todo-form";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// create a new server component TodosCreate.
export default function TodosCreate() {

    const callCreateTodo = async (
        formState: TodoFormState,
        formData: FormData
    ) => {
        "use server"; // mark function as a server action

        await createTodo(formState, formData);
        
        // Revalidate the path and redirect to the home page
        revalidatePath('/')
        redirect('/')
    };


    return (
        <TodoForm formAction={callCreateTodo} initialData={{ name: '', description: '' }} />
    );
}
