"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createTicket } from "@/app/actions";
import { TicketFormState } from "./types";

import TextField from "@/components/text-field";
import SubmitButton from "@/components/button";
import Alert from "@/components/alert";
import Select from "@/components/select";

const initialState: TicketFormState = {
  message: "",
  success: false,
};

export default function CreateTicketForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createTicket, initialState);

  const [subject, setSubject] = useState("");

  const renderCustomFields = () => {
    switch (subject) {
      case "Orders":
        return (
          <div>
            <TextField
              id="order_number"
              type="text"
              label="Order number"
              required={true}
            />
            <TextField
              id="affected_users"
              type="text"
              label="Affecting all users?"
              required={true}
            />
          </div>
        );
      case "Payments":
        return (
          <div>
            <TextField
              id="tr_number"
              type="text"
              label="Transaction number"
              required={true}
            />
            <TextField
              id="tr_status"
              type="text"
              label="Transaction status"
              required={true}
            />
            <TextField
              id="pay_acquirer"
              type="text"
              label="Payment Acquirer"
              required={true}
            />
          </div>
        );
      case "Catalog":
        return (
          <div>
            <TextField id="skuid" type="number" label="SkuId" required={true} />
            <TextField
              id="print_page"
              type="text"
              label="Print of the page"
              required={true}
            />
          </div>
        );
      case "Others":
      default:
        return undefined;
    }
  };

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setSubject("");
    }
  }, [state]);

  return (
    <div className="pb-8">
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

        <Select
          id="subject"
          label="Subject"
          options={["Orders", "Payments", "Catalog", "Others"]}
          required={true}
          setSubject={setSubject}
        />

        {renderCustomFields()}

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
