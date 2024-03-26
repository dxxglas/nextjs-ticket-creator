export type TicketFormBase = {
  ticket: {
    ticket_form_id: number,
    requester: {
      name: string,
      email: string,
    },
    subject: string;
    comment: {
      body: string;
    },
    custom_fields: {
      id: number;
      value: string;
    }[],
  },
};

export type TicketFormState = {
  success: boolean;
  message: string;
}