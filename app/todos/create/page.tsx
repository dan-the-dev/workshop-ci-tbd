import { createTodo } from "@/app/actions/todos";
import TodoForm from "@/app/components/todo-form";

// create a new server component TodosCreate.
export default function TodosCreate() {
    return (
        <main className="flex min-h-screen flex-col items-start p-24">
            <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <TodoForm formAction={createTodo} initialData={{ name: '', description: '' }} />
            </div>
        </main>
    );
}
