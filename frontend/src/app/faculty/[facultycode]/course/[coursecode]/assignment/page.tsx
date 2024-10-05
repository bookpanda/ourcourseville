"use client";

import { AssignmentTile } from "@/src/components/Tile/AssignmentTile";
import { useGetAssignmentByCourse } from "@/src/hooks/useGetAssignmentByCourse";
import { usePathname } from "next/navigation";
import { FaFileSignature } from "react-icons/fa6";

export default function AssignmentPage() {
  const pathname = usePathname();
  const courseCode = pathname.split("/")[4];

  const { assignments } = useGetAssignmentByCourse(courseCode);

  return (
    <main className="flex w-full flex-col max-md:mb-16 md:max-w-[calc(100vw-260px)]">
      <div className="m-4 flex flex-col gap-4 rounded-lg bg-white p-4 lg:mx-8 lg:my-6 lg:p-6">
        <div className="flex items-center gap-2 border-0 pb-0 font-semibold">
          <FaFileSignature
            size={25}
            className="text-secondary-default lg:text-lg"
          />
          <p className="h4 lg:h3 text-high">Assignments</p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="h5 hidden gap-2 px-4 font-semibold text-medium lg:grid lg:grid-cols-[auto,188px,188px]">
            <p className="font-medium">Assignments</p>
            <p className="text-center font-medium">Created At</p>
          </div>
          <div className="flex flex-col gap-3">
            {assignments.map((assignment) => (
              <AssignmentTile key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
