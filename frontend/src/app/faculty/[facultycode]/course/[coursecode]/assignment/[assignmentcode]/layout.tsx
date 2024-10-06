import { getAssignmentByCode } from "@/src/api/assignment";
import { getPathname } from "@/src/utils/getPathname";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { RecordTabs } from "./RecordTabs";

const AssignmentLayout: FC<PropsWithChildren> = async ({ children }) => {
  const pathname = getPathname();
  const pathParts = pathname.split("/");
  const facultyCode = pathParts[2];
  const courseCode = pathParts[4];
  const assignmentCode = pathParts[6];
  const assignmentsPath = `/faculty/${facultyCode}/course/${courseCode}/assignment`;

  const currentAssignment = await getAssignmentByCode(assignmentCode);
  if (currentAssignment instanceof Error) {
    return <div>Error: {currentAssignment.message}</div>;
  }

  const breadcrumb = () => (
    <div className="py-1 lg:p-0">
      <div className="flex py-2 text-sm text-medium">
        <div className="flex">
          <Link href={assignmentsPath}>
            <div className="h-fit cursor-pointer whitespace-nowrap">
              Assignment
            </div>
          </Link>
          <div className="mx-1">{">"}</div>
        </div>
        <div className="text-primary-default">{currentAssignment.name}</div>
      </div>
    </div>
  );

  return (
    <main className="flex w-full flex-col max-md:mb-16 md:max-w-[calc(100vw-260px)]">
      <div className="m-4 flex flex-col gap-4 rounded-lg bg-white p-4 lg:mx-8 lg:my-6 lg:p-6">
        {breadcrumb()}
        <RecordTabs />
        <div className="flex flex-col gap-0.5 pb-1">
          <h2 className="h4 lg:h3 font-bold text-high">
            {currentAssignment.name}
          </h2>
          <hr className="my-1" />
        </div>
        {children}
      </div>
    </main>
  );
};

export default AssignmentLayout;
