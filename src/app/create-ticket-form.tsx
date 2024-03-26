"use client";

import { LegacyRef, useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createTicket } from "@/app/actions";
import { TicketFormState } from "./types";

import TextField from "@/components/text-field";
import SubmitButton from "@/components/button";
import Alert from "@/components/alert";

const initialState: TicketFormState = {
  message: "",
  success: false,
};

export default function CreateTicketForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createTicket, initialState);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div>
      {state.message !== "" && (
        <Alert
          label={<p>{state.message}</p>}
          status={state.success ? "success" : "error"}
        />
      )}
      <h2 className="pb-4	text-xl font-bold text-gray-900">
        Insert informations to create a new ticket:
      </h2>
      <form action={formAction} ref={formRef}>
        <TextField
          id="account_name"
          type="text"
          label="Account name"
          required={true}
        />

        <TextField
          id="requester_email"
          type="email"
          label="Requester Email"
          required={true}
        />

        <TextField id="subject" type="text" label="Subject" required={true} />

        <TextField
          id="detailing"
          type="text"
          label="Detailing"
          required={true}
          multiline={true}
        />

        <SubmitButton label="Create ticket" loading={pending} />
      </form>
    </div>
  );
}
