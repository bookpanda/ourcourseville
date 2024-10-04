import { FC } from "react";
import { Card } from ".";

interface FacultyCardProps {
  href: string;
}

export const FacultyCard: FC<FacultyCardProps> = ({ href }) => {
  return <Card href={href}></Card>;
};
