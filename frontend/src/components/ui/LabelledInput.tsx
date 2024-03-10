import { ChangeEvent } from "react";

interface LabelledInputType {
  label?: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const LabelledInput = ({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputType) => {
  return (
    <div className="flex flex-col space-y-3 ">
      {label && (
        <label htmlFor={label} className="text-xl">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="px-1 py-2 border w-full"
      />
    </div>
  );
};

export default LabelledInput;
