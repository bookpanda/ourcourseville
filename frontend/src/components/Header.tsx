import { FC } from "react";

interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  return <div className="h3 lg:h2 font-semibold">{title}</div>;
};
