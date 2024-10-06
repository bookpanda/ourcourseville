"use client";

import { Tab } from "@/src/components/Tab/Tab";
import { useGetAssignmentByCode } from "@/src/hooks/useGetAssignmentByCode";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren } from "react";

const AssignmentLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const facultyCode = pathParts[2];
  const courseCode = pathParts[4];
  const assignmentCode = pathParts[6];

  const assignmentsPath = `/faculty/${facultyCode}/course/${courseCode}/assignment`;

  const currentTab = pathParts.length > 7 ? 1 : 0;
  const tabs = [
    {
      text: "Records",
      href: `${assignmentsPath}/${assignmentCode}`,
    },
    {
      text: "Solution",
      href: `${assignmentsPath}/${assignmentCode}/record/{currentID}`,
    },
  ];

  const { currentAssignment } = useGetAssignmentByCode(assignmentCode);
  if (!currentAssignment) return null;

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
        <Tab currentIndex={currentTab} items={tabs} />
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
