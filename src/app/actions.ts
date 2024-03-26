"use server";

import { CustomFields } from "./constants";
import { TicketFormData, TicketFormState } from "./types";

function handleRequesterName(email: string) {
  const name = email.substring(0, email.indexOf("@"));
  return name;
}

export async function createTicket(
  prevState: TicketFormState,
  formData: FormData
) {
  const token = btoa(`${process.env.EMAIL}/token:${process.env.API_TOKEN}`);

  const data: TicketFormData = {
    ticket: {
      custom_fields: [
        {
          id: CustomFields.AccountName,
          value: formData.get("account_name") as string,
        },
      ],
      subject: formData.get("subject") as string,
      requester: {
        name: handleRequesterName(formData.get("requester_email") as string),
        email: formData.get("requester_email") as string,
      },
      comment: {
        body: formData.get("detailing") as string,
      },
    },
  };

  const response = await fetch(`${process.env.URL}/api/v2/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (response.status === 201) {
    return {
      success: true,
      message: `Ticket created! Ticket ID: ${result.ticket.id}`,
    };
  }

  return {
    success: false,
    message: "Error on create ticket.",
  };
}
