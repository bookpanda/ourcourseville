"use client";

import { CourseCard } from "@/src/components/Card/CourseCard";
import { Header } from "@/src/components/Header";
import { useGetCourseByFaculty } from "@/src/hooks/useGetCourseByFaculty";
import { usePathname } from "next/navigation";

export default function CoursePage() {
  const pathname = usePathname();
  const facultyCode = pathname.split("/")[2];

  const { courses } = useGetCourseByFaculty(facultyCode);

  return (
    <main>
      <div className="mx-auto my-4 max-w-[1440px] space-y-4 px-4 sm:px-8 md:w-4/5 md:px-0 lg:my-8">
        <div className="flex h-fit w-full items-center justify-between gap-3 max-md:flex-col max-md:items-start">
          <Header title="Courses" />
          <div className="flex flex-row items-center gap-2"></div>
        </div>
        <div className="grid w-full grid-cols-1 justify-items-center gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {courses.map((c) => (
            <CourseCard
              href={`${pathname}/${c.code}`}
              key={c.code}
              course={c}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
