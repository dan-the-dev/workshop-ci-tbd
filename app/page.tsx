// Importing the function to fetch todos from the database.
import { fetchTodos } from "@/db/queries/todos";
import Link from "next/link";
// Importing a component that handles todo deletion.
import TodoDelete from "@/app/components/todo-delete";

export default async function Home() {
  const todos = await fetchTodos() // Fetching the todos fnpx prisma db pushrom the database.
  const dateOptions: Intl.DateTimeFormatOptions = { // Options for formatting dates.
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-4">
        <Link href="/todos/create" className="bg-cyan px-4 py-2 rounded">Create Todo</Link> 
      </div>
      <div className="mb-32 grid gap-x-8 gap-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {todos.map(todo => { // Mapping over the todos and rendering each one.
          return <div key={todo.id}>
            <div className="mb-4">
              <Link
                key={todo.id}
                href={`/todos/${todo.id}/edit`}
                className=""
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  {todo.name}
                </h2>
              </Link>
              <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                {todo.description}
              </p>
            </div>
            <div className="text-sm opacity-30">{'Updated at ' + todo.updatedAt.toLocaleDateString("en-US", dateOptions)}</div>
            <TodoDelete id={todo.id} />
          </div>
        })}
      </div>
    </main>
  );
}
