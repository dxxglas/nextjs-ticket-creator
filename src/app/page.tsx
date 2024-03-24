import CreateTicketForm from "./create-ticket-form";

export default function Page() {
  return (
    <main className="flex flex-col max-w-md mx-auto h-screen">
      <h1 className="py-8	text-2xl font-bold text-gray-900">Zendesk ticket creator</h1>
      <CreateTicketForm />
    </main>
  )
}