import { ChangeEvent, Dispatch, SetStateAction } from "react";

type SelectProps = {
  id: string;
  label: string;
  options: string[];
  required: boolean;
  setOption: Dispatch<SetStateAction<string>>;
};

export default function Select({
  id,
  label,
  options,
  required,
  setOption,
}: SelectProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value);
  };

  return (
    <div className="input-box" id={id} key={id}>
      <label
        className="input-label"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        defaultValue={""}
        onChange={handleChange}
        className="input h-9"
      >
        <option value="" disabled>
          Choose an option...
        </option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
