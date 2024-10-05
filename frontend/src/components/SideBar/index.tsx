import { Course } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface SideBarProps {
  course: Course | null;
}

export const SideBar: FC<SideBarProps> = ({ course }) => {
  const pathname = usePathname();
  const facultyCode = pathname.split("/")[2];

  if (!course) {
    return null;
  }

  const { code, name, icon } = course;

  return (
    <div className="sticky top-[62px] hidden h-[calc(100vh-62px)] min-w-[260px] max-w-[260px] bg-white md:block">
      <div className="font-ibmplex xs:hidden min-h-full w-[260px] bg-white text-base sm:hidden md:flex md:flex-col lg:flex lg:flex-col xl:flex xl:flex-col 2xl:flex 2xl:flex-col">
        <Link href={`/faculty/${facultyCode}/course`}>
          <button
            type="button"
            className="flex w-[87px] flex-row items-center gap-2 px-4 py-2 font-light text-primary-default"
          >
            <FaArrowLeft size={20} />
            Back
          </button>
        </Link>
        <div className="flex flex-col px-3">
          <div className="bg-default flex flex-row items-center gap-3 rounded-lg p-3">
            <Image
              src={icon}
              alt="desktop course icon"
              className="h-12 w-12 rounded-full"
              height={48}
              width={48}
              unoptimized
            />
            <div className="flex flex-col gap-1">
              <div className="text-sm font-semibold text-secondary-default">
                {code}
              </div>
              <div className="text-sm">{name}</div>
            </div>
          </div>
          <hr className="my-3" />
        </div>
      </div>
    </div>
  );
};
