"use client";

import { FaUniversity } from "react-icons/fa";
import { FaFileSignature, FaGraduationCap, FaHouse } from "react-icons/fa6";

import { usePathname } from "next/navigation";

import { Logo } from "./Logo";
import { NavItem } from "./NavItem";

export const NavBar = () => {
  const pathname = usePathname();

  const matchFaculty = pathname === "/faculty";

  const courseRegex = /^\/faculty\/([^/]+)\/course$/;
  const matchCourse = courseRegex.test(pathname);

  const assignmentRegex = /^\/faculty\/([^/]+)\/course\/([^/]+)\/assignment$/;
  const matchAssignment = assignmentRegex.test(pathname);

  return (
    <div className="sticky top-0 z-50 flex min-h-[62px] items-center justify-between bg-white px-10">
      <Logo />
      <div className="flex items-center gap-4">
        <NavItem href="/" isSelected={pathname === "/"}>
          <FaHouse size={25} />
          Home
        </NavItem>
        <NavItem href="/faculty" isSelected={matchFaculty}>
          <FaUniversity size={25} />
          Faculties
        </NavItem>
        <NavItem href="/course" isSelected={matchCourse}>
          <FaGraduationCap size={25} /> Courses
        </NavItem>
        <NavItem href="/assignment" isSelected={matchAssignment}>
          <FaFileSignature size={25} /> Assignments
        </NavItem>
      </div>
      <div className="flex items-center gap-4"></div>
    </div>
  );
};
