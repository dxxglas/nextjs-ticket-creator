type TextFieldProps = {
  id: string;
  label: string;
  type: string;
  required: boolean;
  multiline?: boolean;
};

export default function TextField({
  id,
  label,
  type,
  required,
  multiline = false,
}: TextFieldProps) {
  return (
    <div className="mb-5" id={id} key={id}>
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          required={required}
          rows={4}
          cols={50}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
      ) : (
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type={type}
          id={id}
          name={id}
          required={required}
        />
      )}
    </div>
  );
}
