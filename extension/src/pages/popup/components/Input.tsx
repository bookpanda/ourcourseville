import { FC } from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const Input: FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="prose [&>*]:h6 [&>*]:lg:h5 [&>*]:font-ibmplexLoop border-default min-h-[44px] w-full cursor-pointer overflow-x-auto rounded-lg border bg-white px-3 py-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>*]:leading-normal"
    />
  );
};
