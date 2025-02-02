// Importing the function to fetch todos from the database.
import { fetchTodos } from "@/db/queries/todos";
import Link from "next/link";
// Importing a component that handles todo deletion.
import TodoDelete from "@/app/components/todo-delete";

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
      <div className="navbar bg-neutral text-neutral-content mb-4">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Workshop CI & TBD</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-primary">
            <Link href="/todos/create" className="bg-cyan px-4 py-2 rounded">
              Create new Todo
            </Link>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 justify-start">
        {todos.map((todo) => {
          // Mapping over the todos and rendering each one.
          return (
            <div key={todo.id}>
              <div className="card bg-neutral text-primary-content w-96">
                <div className="card-body">
                  <h2 className="card-title flex justify-between">
                    {todo.name}
                    <button className="btn btn-square btn-sm">
                      <Link
                        key={todo.id}
                        href={`/todos/${todo.id}/edit`}
                        className=""
                      >
                        <svg
                          className="inline-block h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path>
                        </svg>
                      </Link>
                    </button>
                  </h2>
                  <p>{todo.description}</p>
                  <div className="text-sm opacity-30">
                    {"Last changed: " +
                      todo.updatedAt.toLocaleDateString("en-US", dateOptions)}
                  </div>
                  <div className="card-actions justify-end">
                    <TodoDelete id={todo.id} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
