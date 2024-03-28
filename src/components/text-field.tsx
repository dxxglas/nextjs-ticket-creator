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
    <div className="input-box" id={id} key={id}>
      <label
        className="input-label"
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
          className="input"
        />
      ) : (
        <input
          className="input h-9"
          type={type}
          id={id}
          name={id}
          required={required}
        />
      )}
    </div>
  );
}
