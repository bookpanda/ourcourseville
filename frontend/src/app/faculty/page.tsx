"use client";

import { FacultyCard } from "@/src/components/Card/FacultyCard";
import { Header } from "@/src/components/Header";
import { useGetAllFaculty } from "@/src/hooks/useGetAllFaculty";
import { setCurrentFaculty } from "@/src/store/facultySlice";
import { useAppDispatch } from "@/src/store/store";
import { Faculty } from "@/src/types";

export default function FacultyPage() {
  const { faculties } = useGetAllFaculty();
  const dispatch = useAppDispatch();

  const handleClick = (f: Faculty) => {
    dispatch(setCurrentFaculty(f));
  };

  return (
    <main>
      <div className="mx-auto my-4 max-w-[1440px] space-y-4 px-4 sm:px-8 md:w-4/5 md:px-0 lg:my-8">
        <div className="flex h-fit w-full items-center justify-between gap-3 max-md:flex-col max-md:items-start">
          <Header title="Faculties" />
          <div className="flex flex-row items-center gap-2"></div>
        </div>
        <div className="grid w-full grid-cols-1 justify-items-center gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {faculties.map((f) => (
            <FacultyCard
              key={f.code}
              faculty={f}
              onClick={() => handleClick(f)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
