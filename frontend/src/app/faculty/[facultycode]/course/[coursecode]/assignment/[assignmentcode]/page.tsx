"use client";

import { RecordCard } from "@/src/components/Card/RecordCard";
import { useGetRecordByAssignment } from "@/src/hooks/useGetRecordByAssignment";
import { usePathname } from "next/navigation";

export default function AssignmentPage() {
  const pathname = usePathname();
  const assignmentCode = pathname.split("/")[6];

  const { records } = useGetRecordByAssignment(assignmentCode);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="h5 hidden gap-2 px-4 font-semibold text-medium lg:grid lg:grid-cols-[auto,188px,188px]">
        <p className="font-medium">Records</p>
        <p className="text-center font-medium">Created At</p>
      </div>
      <div className="flex flex-col gap-3">
        {records.map((r) => (
          <RecordCard key={r.id} href={`${pathname}/${r.id}`} record={r} />
        ))}
      </div>
    </div>
  );
}
