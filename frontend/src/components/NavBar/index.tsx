"use client";

import { FaUniversity } from "react-icons/fa";
import { FaFileSignature, FaGraduationCap, FaHouse } from "react-icons/fa6";

import { usePathname } from "next/navigation";

import { EXTENSION_URL } from "@/src/config/config";
import { useIsUnderLargeViewport } from "@/src/hooks/useIsUnderLargeViewport";
import { selectCurrentCourse } from "@/src/store/courseSlice";
import { selectCurrentFaculty } from "@/src/store/facultySlice";
import { useAppSelector } from "@/src/store/store";
import clsx from "clsx";
import { ExtensionButton } from "../IconButton/ExtensionButton";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";

export const NavBar = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const facultyCode = pathParts.length > 2 ? pathParts[2] : "";
  const courseCode = pathParts.length > 4 ? pathParts[4] : "";

  const matchFaculty = pathname === "/faculty";

  const courseRegex = /^\/faculty\/([^/]+)\/course$/;
  const matchCourse = courseRegex.test(pathname);

  const assignmentRegex = /^\/faculty\/([^/]+)\/course\/([^/]+)\/assignment$/;
  const matchAssignment = assignmentRegex.test(pathname);

  const currentFaculty = useAppSelector(selectCurrentFaculty);
  const currentCourse = useAppSelector(selectCurrentCourse);

  const facultyCode_ = currentFaculty?.code
    ? currentFaculty?.code
    : facultyCode;
  const courseCode_ = currentCourse?.code ? currentCourse?.code : courseCode;

  const isCoursesEnabled =
    currentFaculty?.code !== undefined || facultyCode !== "";
  const coursesPath = `/faculty/${facultyCode_}/course`;

  const isAssignmentsEnabled =
    isCoursesEnabled &&
    (currentCourse?.code !== undefined || courseCode !== "");
  const assignmentsPath = `/faculty/${facultyCode_}/course/${courseCode_}/assignment`;

  const { isUnderLarge } = useIsUnderLargeViewport();

  return (
    <div
      className={clsx(
        "pt-safe sticky top-0 z-50 flex items-center justify-between bg-white",
        isUnderLarge ? "shadow-default min-h-[60px] px-5" : "min-h-[62px] px-10"
      )}
    >
      <Logo />
      <div className="flex items-center gap-4 font-light">
        <NavItem href="/" isSelected={pathname === "/"} isEnabled>
          <FaHouse size={25} />
          Home
        </NavItem>
        <NavItem href="/faculty" isSelected={matchFaculty} isEnabled>
          <FaUniversity size={25} />
          Faculties
        </NavItem>
        <NavItem
          href={coursesPath}
          isSelected={matchCourse}
          isEnabled={isCoursesEnabled}
        >
          <FaGraduationCap size={25} /> Courses
        </NavItem>
        <NavItem
          href={assignmentsPath}
          isSelected={matchAssignment}
          isEnabled={isAssignmentsEnabled}
        >
          <FaFileSignature size={25} /> Assignments
        </NavItem>
      </div>
      <div className="flex items-center gap-2 font-light">
        <ExtensionButton url={EXTENSION_URL} />
        <p>Get extension</p>
      </div>
    </div>
  );
};
