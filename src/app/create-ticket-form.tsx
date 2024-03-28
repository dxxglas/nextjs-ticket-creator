"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { createTicket } from "@/app/actions";
import { TicketFormState } from "./types";

import TextField from "@/components/text-field";
import SubmitButton from "@/components/button";
import Select from "@/components/select";
import ResultBox from "./components/result-box";

export default function CreateTicketForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const initialState: TicketFormState = {
    message: "",
    success: false,
  };

  const [state, formAction] = useFormState(createTicket, initialState);
  const [viewAlert, setViewAlert] = useState(false);

  const [subject, setSubject] = useState("");
  const [_, setAffectedUsers] = useState("");

  const renderCustomFields = () => {
    switch (subject) {
      case "Orders":
        return (
          <div className="grid gap-x-4 lg:grid-cols-2">
            <TextField
              id="order_number"
              type="text"
              label="Order number"
              required={true}
            />

            <Select
              id="affected_users"
              label="Affecting all users?"
              options={["Yes", "No"]}
              required={true}
              setOption={setAffectedUsers}
            />
          </div>
        );
      case "Payments":
        return (
          <div className="grid gap-x-4 lg:grid-cols-2">
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
            <div className="lg:col-span-2">
              <TextField
                id="pay_acquirer"
                type="text"
                label="Payment acquirer"
                required={true}
              />
            </div>
          </div>
        );
      case "Catalog":
        return (
          <div className="grid gap-x-4 lg:grid-cols-2">
            <TextField id="skuid" type="number" label="SkuId" required={true} />
            <TextField
              id="print_page"
              type="url"
              label="Print of the page (URL)"
              required={true}
            />
          </div>
        );
      case "Others":
      default:
        return undefined;
    }
  };

  const handleViewAlert = () => {
    setViewAlert(false);
  }

  useEffect(() => {
    if (state) {
      formRef.current?.reset();
      setSubject("");
      setAffectedUsers("");
    }

    if (state.message !== "") {
      setViewAlert(true);
    }
  }, [state]);

  return (
    <div>
      {viewAlert ? (
        <ResultBox 
          state={state}
          handleViewResult={handleViewAlert}
        />
      ) : (
        <div>
          <h2 className="pb-4 text-lg font-medium text-gray-900">
            Insert informations to create a new ticket
          </h2>
          <form action={formAction} ref={formRef}>
            <div className="grid gap-x-4 lg:grid-cols-2">
              <TextField
                id="account_name"
                type="text"
                label="Account name"
                required={true}
              />

              <TextField
                id="requester_email"
                type="email"
                label="Requester email"
                required={true}
              />
            </div>

            <Select
              id="subject"
              label="Subject"
              options={["Orders", "Payments", "Catalog", "Others"]}
              required={true}
              setOption={setSubject}
            />

            {renderCustomFields()}

            <TextField
              id="detailing"
              type="text"
              label="Detailing"
              required={true}
              multiline={true}
            />

            <SubmitButton label="Create ticket" />
          </form>
        </div>
      )}
    </div>
  );
}
