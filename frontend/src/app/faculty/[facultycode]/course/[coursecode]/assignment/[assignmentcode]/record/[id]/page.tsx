import { getRecordByID } from "@/src/api/record";
import { Badge } from "@/src/components/Badge";
import { CopyButton } from "@/src/components/CopyButton/CopyButton";
import { Problem } from "@/src/types";
import { formatTime } from "@/src/utils/formatTime";
import { getPathname } from "@/src/utils/getPathname";

export const RecordPage = async () => {
  const pathname = getPathname();
  const recordID = pathname.split("/")[8];

  const currentRecord = await getRecordByID(recordID);
  if (currentRecord instanceof Error) {
    return <div>Error: {currentRecord.message}</div>;
  }
  const { id, createdAt, problems } = currentRecord;

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
      <div className="flex flex-col items-start justify-between gap-3 lg:flex-row lg:items-center lg:gap-2">
        <div className="flex items-center gap-3">
          <Badge text={id} />
          <CopyButton text={id} />
        </div>
        <h5 className="h6 lg:h5 text-medium">{formattedDate}</h5>
      </div>
      <div className="flex flex-col gap-6">
        {problems.map((problem) => problemDiv(problem))}
      </div>
    </>
  );
};

export default RecordPage;
