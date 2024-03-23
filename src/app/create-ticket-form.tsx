"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createTicket } from "@/app/actions";
import { TicketFormState } from "./types";

const initialState: TicketFormState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">
      Create Ticket
    </button>
  );
}

export function CreateTicketForm() {
  const [state, formAction] = useFormState(createTicket, initialState);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        Insert informations to create a new ticket:
      </h2>
      <form action={formAction}>
        <div>
          <label htmlFor="account_name">Account name</label>
          <input type="text" id="account_name" name="account_name" required />
        </div>

        <div>
          <label htmlFor="requester_email">Requester Email</label>
          <input type="email" id="requester_email" name="requester_email" required />
        </div>
        
        <div>
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" name="subject" required />
        </div>

        <div>
          <label htmlFor="detailing">Detailing</label>
          <input type="text" id="detailing" name="detailing" required />
        </div>

        <SubmitButton />
        {
          state.success && (
            <p>{state.message}</p>
          )
        }
      </form>
    </div>
  );
}