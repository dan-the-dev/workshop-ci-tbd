"use client";

import Link from "next/link";
import { useActionState } from "react";

// Define the shape of the form errors
interface FormErrors {
  name?: string[];
  description?: string[];
}

// Define the shape of the form state
interface FormState {
  errors: FormErrors;
}

// Define the props that the TodoForm component expects
interface TodoFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formAction: any; // The action to perform when the form is submitted
  initialData: {
    // The initial data for the form fields
    name: string;
    description: string;
  };
}

// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields.
export default function TodoForm({ formAction, initialData }: TodoFormProps) {
  // Initialize the form state and action
  const [formState, action] = useActionState<FormState>(formAction, {
    errors: {},
  });

  return (
    <>
      <div className="navbar">
        <div className="flex">
          <button className="btn btn-sm btn-square btn-ghost">
            <Link href="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </Link>
          </button>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            {initialData.name ? "Update" : "Create"} Todo
          </a>
        </div>
      </div>
      <div className="justify-start w-full">
        <form action={action} className="w-full flex flex-col gap-4">
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{"The name of the task"}</legend>
                <input type="text" name="name" className="input w-full" placeholder="Name" defaultValue={initialData.name} data-testid="name"/>
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">{"Describe the task"}</legend>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={initialData.description}
                    placeholder="Description"
                    className="textarea textarea-bordered textarea-lg w-full grow"
                    data-testid="description"
                ></textarea>
                {formState.errors.description && (
                  <p className="text-red-500">
                    {formState.errors.description?.join(", ")}
                  </p>
                )}
            </fieldset>
            <button className="btn btn-primary grow" type="submit" data-testid="save">
              Save
            </button>
            <Link href="/" className="btn btn-accent btn-outline bg-red px-4 py-2 rounded">
              Cancel
            </Link>
        </form>
      </div>
    </>
  );
}
