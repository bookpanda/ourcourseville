"use client";

import { usePathname } from "next/navigation";
import { FaFileSignature } from "react-icons/fa6";

export default function AssignmentPage() {
  const pathname = usePathname();
  //   const facultyCode = pathname.split("/")[2];

  //   const { assignments } = useGetAssignmentByFaculty(facultyCode);

  return (
    <main className="flex w-full flex-col max-md:mb-16 md:max-w-[calc(100vw-260px)]">
      <div className="m-4 flex flex-col gap-4 rounded-lg bg-white p-4 lg:mx-8 lg:my-6 lg:p-6">
        <div className="flex items-center gap-2 border-0 pb-0 font-semibold">
          <FaFileSignature
            size={25}
            className="text-secondary-default lg:text-lg"
          />
          <p className="text-high h4 lg:h3">Assignments</p>
        </div>
      </div>
    </main>
  );
}
