import CreateTicketForm from "./create-ticket-form";

export default function Page() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row">
      <div className="split-screen bg-teal-900/[.06] flex items-center">
        <h1 className="flex flex-col lg:absolute lg:top-2/3 text-6xl font-bold text-gray-900">
          <span className="text-5xl">Zendesk</span>
          <span>ticket creator</span>
        </h1>
      </div>
      <div className="split-screen lg:px-24 lg:py-16">
        <CreateTicketForm />
      </div>
    </main>
  );
}
