export type TicketFormData = {
  ticket: {
    custom_fields: {
      id: number;
      value: string;
    }[],
    requester: {
      name: string,
      email: string,
    },
    subject: string;
    comment: {
      body: string;
    },
  },
};

export type TicketFormState = {
  success: boolean;
  message: string;
}