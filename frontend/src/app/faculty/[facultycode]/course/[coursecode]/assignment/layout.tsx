import { getCourseByCode } from "@/src/api/course";
import { SideBar } from "@/src/components/SideBar";
import { getPathname } from "@/src/utils/getPathname";
import { FC, PropsWithChildren } from "react";

const AssignmentLayout: FC<PropsWithChildren> = async ({ children }) => {
  const pathname = getPathname();
  const courseCode = pathname.split("/")[4];

  const currentCourse = await getCourseByCode(courseCode);
  if (currentCourse instanceof Error) {
    return <div>Error: {currentCourse.message}</div>;
  }

  return (
    <main>
      <div className="flex">
        <SideBar course={currentCourse} />
        {children}
      </div>
    </main>
  );
};

export default AssignmentLayout;
