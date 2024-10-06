"use client";

import { FaUniversity } from "react-icons/fa";
import { FaFileSignature, FaGraduationCap, FaHouse } from "react-icons/fa6";

import { usePathname } from "next/navigation";

import { selectCurrentCourse } from "@/src/store/courseSlice";
import { selectCurrentFaculty } from "@/src/store/facultySlice";
import { useAppSelector } from "@/src/store/store";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";

export const NavBar = () => {
  const pathname = usePathname();

  const matchFaculty = pathname === "/faculty";

  const courseRegex = /^\/faculty\/([^/]+)\/course$/;
  const matchCourse = courseRegex.test(pathname);

  const assignmentRegex = /^\/faculty\/([^/]+)\/course\/([^/]+)\/assignment$/;
  const matchAssignment = assignmentRegex.test(pathname);

  const currentFaculty = useAppSelector(selectCurrentFaculty);
  const currentCourse = useAppSelector(selectCurrentCourse);

  const isCoursesEnabled = currentFaculty !== null;
  const coursesPath = `/faculty/${currentFaculty?.code}/course`;

  const isAssignmentsEnabled = isCoursesEnabled && currentCourse !== null;
  const assignmentsPath = `/faculty/${currentFaculty?.code}/course/${currentCourse?.code}/assignment`;

  return (
    <div className="sticky top-0 z-50 flex min-h-[62px] items-center justify-between bg-white px-10">
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
      <div className="flex items-center gap-4"></div>
    </div>
  );
};
