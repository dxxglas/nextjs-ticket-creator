import Alert from "@/components/alert";
import { TicketFormState } from "../types";

type ResultBoxProps = {
  state: TicketFormState;
  handleViewResult: () => void;
}

export default function ResultBox({
  state,
  handleViewResult,
}: ResultBoxProps) {
  return (
    <div className="text-center">
      <Alert
        label={<p>{state.message}</p>}
        status={state.success ? "success" : "error"}
      />

      <button
        className="font-medium text-sm underline"
        onClick={handleViewResult}
      >
        Create new ticket
      </button>
    </div>
  );
}
