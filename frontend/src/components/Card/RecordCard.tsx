import { Record } from "@/src/types";
import { FC } from "react";
import { Card } from ".";

interface RecordCardProps {
  href: string;
  record: Record;
}

export const RecordCard: FC<RecordCardProps> = ({ href, record }) => {
  const { id } = record;
  return (
    <Card href={href}>
      <div className="flex flex-col gap-1">
        <div className="text-sm font-semibold text-primary-default">{id}</div>
      </div>
    </Card>
  );
};

{
  /* <div className="grid items-center gap-2 lg:grid-cols-[auto,188px,188px]">
  <div className="flex gap-2">
    <FaUser size={25} className="w-4 pt-0.5 text-medium lg:w-5 lg:text-lg" />
    <h5 className="h6 lg:h5 font-semibold text-high">{name}</h5>
  </div>
  <div className="h6 flex justify-center text-center text-medium">
    {formattedDate}
  </div>
</div>; */
}
