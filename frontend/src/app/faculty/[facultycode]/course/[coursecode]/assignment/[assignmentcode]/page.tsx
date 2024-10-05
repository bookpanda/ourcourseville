"use client";

import { useGetAssignmentByCode } from "@/src/hooks/useGetAssignmentByCode";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AssignmentPage() {
  const pathname = usePathname();
  const facultyCode = pathname.split("/")[2];
  const courseCode = pathname.split("/")[4];
  const assignmentCode = pathname.split("/")[6];

  const { assignment } = useGetAssignmentByCode(assignmentCode);
  if (!assignment) return null;

  const breadcrumb = () => (
    <div className="py-1 lg:p-0">
      <div className="flex py-2 text-sm text-medium">
        <div className="flex">
          <Link
            href={`/faculty/${facultyCode}/course/${courseCode}/assignment`}
          >
            <div className="h-fit cursor-pointer whitespace-nowrap">
              Assignment
            </div>
          </Link>
          <div className="mx-1">{">"}</div>
        </div>
        <div className="text-primary-default">{assignment.name}</div>
      </div>
    </div>
  );

  return (
    <main className="flex w-full flex-col max-md:mb-16 md:max-w-[calc(100vw-260px)]">
      <div className="m-4 flex flex-col gap-4 rounded-lg bg-white p-4 lg:mx-8 lg:my-6 lg:p-6">
        {breadcrumb()}
      </div>
    </main>
  );
}
