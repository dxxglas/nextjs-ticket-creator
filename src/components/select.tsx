import { ChangeEvent, Dispatch, SetStateAction } from "react";

type SelectProps = {
  id: string;
  label: string;
  options: string[];
  required: boolean;
  setSubject: Dispatch<SetStateAction<string>>;
};

export default function Select({
  id,
  label,
  options,
  required,
  setSubject,
}: SelectProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSubject(event.target.value);
  };
  return (
    <div className="mb-5" id={id} key={id}>
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
