"use client";

import { Badge } from "@/src/components/Badge";
import { useGetRecordByID } from "@/src/hooks/useGetRecordByID";
import { Problem } from "@/src/types";
import { formatTime } from "@/src/utils/formatTime";
import { usePathname } from "next/navigation";

export default function RecordPage() {
  const pathname = usePathname();
  const recordID = pathname.split("/")[8];

  const { record } = useGetRecordByID(recordID);
  if (!record) return null;
  const { id, createdAt, problems } = record;

  const formattedDate = formatTime(createdAt);

  const problemDiv = (p: Problem) => (
    <div className="flex flex-col gap-2 lg:gap-3">
      <div className="h6 lg:h5">{p.question}</div>
      <div className="h6 lg:h5 border-default bg-light min-h-[44px] w-full cursor-not-allowed overflow-x-auto whitespace-pre-wrap rounded-lg border px-3 py-2 text-high">
        {p.answer}
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:gap-2">
        <Badge text={id} />
        <h5 className="h6 lg:h5 text-medium">{formattedDate}</h5>
      </div>
      <div className="flex flex-col gap-6">
        {problems.map((problem) => problemDiv(problem))}
      </div>
    </>
  );
}
