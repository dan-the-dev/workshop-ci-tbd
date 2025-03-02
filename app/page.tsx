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
    <main className="flex min-h-screen flex-col items-start p-2 md:px-96 bg-base-100 text-base-content">
      
      <div className="navbar">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">To Do</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-sm btn-square btn-ghost">
            <Link href="/todos/create">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus h-5 w-5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </Link>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-start">
          {todos.map((todo) => {
            const completed = todo.completedAt ? true : false;
            // Mapping over the todos and rendering each one.
            return (
              <div key={todo.id} className="card w-full shadow-md bg-neutral text-neutral-content">
                <div className="card-body">
                  <div className="card-actions justify-end absolute top-0 right-0">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                      </div>
                      <ul tabIndex={0} className="dropdown-content menu bg-base-100 text-base-content rounded-box z-1 w-52 p-2 shadow-sm">
                        <li><Link href={`/todos/${todo.id}/edit`}>Edit</Link></li>
                        <li><TodoDelete id={todo.id} /></li>
                        <li><TodoComplete id={todo.id} completed={completed}/></li>
                      </ul>
                    </div>
                  </div>
                  <h2 className="card-title">{todo.name}</h2>
                  <p>{todo.description}</p>
                  <p className="text-xs">{"Last changed: " + todo.updatedAt.toLocaleDateString("en-US", dateOptions)}</p>
                </div>
              </div>
            )
          })}
      </div>
    </main>
  );
}
