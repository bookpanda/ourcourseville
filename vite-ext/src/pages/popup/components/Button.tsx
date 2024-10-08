import { FC } from "react";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  text: string;
}

export const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <button
      type="button"
      className="hover:bg-primary-medium active:bg-primary-dark active:shadow-primary disabled:bg-disable disabled:border-disable disabled:text-disable lg:h5 h6 inline-flex h-8 w-fit min-w-fit items-center justify-center gap-x-2 rounded-lg bg-primary-default px-4 py-1 text-white transition-colors disabled:pointer-events-none disabled:border disabled:opacity-100 lg:h-10 lg:px-4 lg:py-2"
    >
      {text}
    </button>
  );
};
