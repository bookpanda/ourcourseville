"use client";

import { useGetAssignmentByCode } from "@/src/hooks/useGetAssignmentByCode";
import { usePathname } from "next/navigation";

export default function AssignmentPage() {
  const pathname = usePathname();
  const facultyCode = pathname.split("/")[2];
  const courseCode = pathname.split("/")[4];
  const assignmentCode = pathname.split("/")[6];

  const { assignment } = useGetAssignmentByCode(assignmentCode);
  if (!assignment) return null;

  return (
    <main className="flex w-full flex-col max-md:mb-16 md:max-w-[calc(100vw-260px)]"></main>
  );
}
