import { createTodo } from "@/app/actions/todos";
import TodoForm from "@/app/components/todo-form";

// create a new server component TodosCreate.
export default function TodosCreate() {
    return (
            <TodoForm formAction={createTodo} initialData={{ name: '', description: '' }} />
    );
}
