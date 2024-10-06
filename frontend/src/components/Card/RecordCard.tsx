import { toast } from "@/hooks/use-toast";
import { Record } from "@/src/types";
import { formatTime } from "@/src/utils/formatTime";
import { FC } from "react";
import { Card } from ".";

interface RecordCardProps {
  href: string;
  record: Record;
}

export const RecordCard: FC<RecordCardProps> = ({ href, record }) => {
  const { id, createdAt } = record;
  const formattedDate = formatTime(createdAt);

  const handleClick = () => {
    navigator.clipboard.writeText(record.id);

    toast({
      title: "Copied",
      description: record.id,
    });
  };

  return (
    <Card href={href} onClick={handleClick}>
      <div className="grid items-center gap-2 lg:grid-cols-[auto,188px,188px]">
        <div className="flex gap-2">
          <h5 className="h6 lg:h5 font-semibold text-primary-default">{id}</h5>
        </div>
        <div className="h6 flex justify-center text-center text-medium">
          {formattedDate}
        </div>
      </div>
    </Card>
  );
};
