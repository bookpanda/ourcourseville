"use client";

import { SideBar } from "@/src/components/SideBar";
import { useGetCourseByCode } from "@/src/hooks/useGetCourseByCode";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren } from "react";

const AssignmentLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const courseCode = pathname.split("/")[4];

  const { course } = useGetCourseByCode(courseCode);

  return (
    <main>
      <div className="flex">
        <SideBar course={course} />
        {children}
      </div>
    </main>
  );
};

export default AssignmentLayout;
