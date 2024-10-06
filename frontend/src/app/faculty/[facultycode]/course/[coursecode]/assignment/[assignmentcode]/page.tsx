import { getRecordByAssignment } from "@/src/api/record";
import { RecordCard } from "@/src/components/Card/RecordCard";
import { getPathname } from "@/src/utils/getPathname";

export const AssignmentPage = async () => {
  const pathname = getPathname();
  const assignmentCode = pathname.split("/")[6];

  const records = await getRecordByAssignment(assignmentCode);
  if (records instanceof Error) {
    return <div>Error: {records.message}</div>;
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="h5 hidden gap-2 px-4 font-semibold text-medium lg:grid lg:grid-cols-[auto,188px,188px]">
        <p className="font-medium">Records</p>
        <p className="text-center font-medium">Created At</p>
      </div>
      <div className="flex flex-col gap-3">
        {records.map((r) => (
          <RecordCard
            key={r.id}
            href={`${pathname}/record/${r.id}`}
            record={r}
          />
        ))}
      </div>
    </div>
  );
};

export default AssignmentPage;
