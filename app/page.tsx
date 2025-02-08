// Importing the function to fetch todos from the database.
import { fetchTodos } from "@/db/queries/todos";
import Link from "next/link";
// Importing a component that handles todo deletion.
import TodoDelete from "@/app/components/todo-delete";
import TodoComplete from "./components/todo-complete";

export default async function Home() {
  const todos = await fetchTodos(); // Fetching the todos fnpx prisma db pushrom the database.
  const dateOptions: Intl.DateTimeFormatOptions = {
    // Options for formatting dates.
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="navbar bg-secondary text-neutral-content mb-4">
        <div className="flex-1">
          <p className="btn btn-ghost text-xl">Workshop CI & TBD</p>
        </div>
        <div className="flex-none">
          <button className="btn btn-primary btn-outline">
            <Link href="/todos/create" className="bg-cyan px-4 py-2 rounded">
              Create new Todo
            </Link>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 justify-start">
        <div className="overflow-x-auto">
          <table className="table">
            <tbody>
              {todos.map((todo) => {
                const completed = todo.completedAt ? true : false;
                // Mapping over the todos and rendering each one.
                return (
                  <tr key={todo.id} className={completed ? 'line-through text-success' : ''}>
                    <th>
                      <TodoComplete id={todo.id} completed={completed}/>
                    </th>
                    <td>
                      <p className="text-lg font-bold">{todo.name}</p>
                    </td>
                    <td>
                      <p className="text-sm italic">{todo.description}</p>
                    </td>
                    <td>
                      <p className="text-xs">{"Last changed: " + todo.updatedAt.toLocaleDateString("en-US", dateOptions)}</p>
                    </td>
                    <th>
                      <button className="btn btn-sm btn-primary" disabled={completed}>
                        <Link href={`/todos/${todo.id}/edit`}>Edit</Link>
                      </button>
                    </th>
                    <th>
                        <TodoDelete id={todo.id} />
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
