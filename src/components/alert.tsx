import { ReactNode } from "react";

type AlertProps = {
  label: ReactNode;
  status: "success" | "error";
};

export default function Alert({ label, status }: AlertProps) {
  const statusClasses = status === "success" ? "text-green-800 bg-green-50" : "text-red-800 bg-red-50"

  return (
    <div
      className={`p-4 mb-4 text-sm rounded-lg ${statusClasses}`}
      role="alert"
    >
      {label}
    </div>
  );
}
