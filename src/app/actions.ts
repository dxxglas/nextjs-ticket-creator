"use server";

import {
  CatalogCustomFields,
  DefaultCustomField,
  OrdersCustomFields,
  PaymentsCustomFields,
} from "./constants";
import { TicketFormBase, TicketFormState } from "./types";

function handleRequesterName(email: string) {
  const name = email.substring(0, email.indexOf("@"));
  return name;
}

export async function createTicket(
  prevState: TicketFormState,
  formData: FormData
) {
  const token = btoa(`${process.env.EMAIL}/token:${process.env.API_TOKEN}`);

  const subject = formData.get("subject") as string;
  let data: TicketFormBase;

  switch (subject) {
    case "Orders":
      data = {
        ticket: {
          custom_fields: [
            {
              id: OrdersCustomFields.AccountName,
              value: formData.get("account_name") as string,
            },
            {
              id: OrdersCustomFields.OrderNumber,
              value: formData.get("order_number") as string,
            },
            {
              id: OrdersCustomFields.AffectingAllUsers,
              value: formData.get("affected_users") as string === "Yes",
            },
          ],
          subject: subject,
          requester: {
            name: handleRequesterName(
              formData.get("requester_email") as string
            ),
            email: formData.get("requester_email") as string,
          },
          comment: {
            body: formData.get("detailing") as string,
          },
          ticket_form_id: Number(process.env.ORDERS_FORM),
        },
      };
      break;
    case "Payments":
      data = {
        ticket: {
          custom_fields: [
            {
              id: PaymentsCustomFields.AccountName,
              value: formData.get("account_name") as string,
            },
            {
              id: PaymentsCustomFields.TransactionNumber,
              value: formData.get("tr_number") as string,
            },
            {
              id: PaymentsCustomFields.TransactionStatus,
              value: formData.get("tr_status") as string,
            },
            {
              id: PaymentsCustomFields.PaymentAcquirer,
              value: formData.get("pay_acquirer") as string,
            },
          ],
          subject: subject,
          requester: {
            name: handleRequesterName(
              formData.get("requester_email") as string
            ),
            email: formData.get("requester_email") as string,
          },
          comment: {
            body: formData.get("detailing") as string,
          },
          ticket_form_id: Number(process.env.PAYMENTS_FORM),
        },
      };
      break;
    case "Catalog":
      data = {
        ticket: {
          custom_fields: [
            {
              id: CatalogCustomFields.AccountName,
              value: formData.get("account_name") as string,
            },
            {
              id: CatalogCustomFields.SkuId,
              value: formData.get("skuid") as string,
            },
            {
              id: CatalogCustomFields.PrintPage,
              value: formData.get("print_page") as string,
            },
          ],
          subject: subject,
          requester: {
            name: handleRequesterName(
              formData.get("requester_email") as string
            ),
            email: formData.get("requester_email") as string,
          },
          comment: {
            body: formData.get("detailing") as string,
          },
          ticket_form_id: Number(process.env.CATALOG_FORM),
        },
      };
      break;
    case "Others":
    default:
      data = {
        ticket: {
          custom_fields: [
            {
              id: DefaultCustomField.AccountName,
              value: formData.get("account_name") as string,
            },
          ],
          subject: subject,
          requester: {
            name: handleRequesterName(
              formData.get("requester_email") as string
            ),
            email: formData.get("requester_email") as string,
          },
          comment: {
            body: formData.get("detailing") as string,
          },
          ticket_form_id: Number(process.env.OTHERS_FORM),
        },
      };
  }

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
