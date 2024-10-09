"use client";

import { FaUniversity } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

import { FaFileSignature, FaGraduationCap, FaHouse } from "react-icons/fa6";

import { usePathname } from "next/navigation";

import { EXTENSION_URL } from "@/src/config/config";
import { useIsMobileViewport } from "@/src/hooks/useIsUnderLargeViewport";
import { selectCurrentCourse } from "@/src/store/courseSlice";
import { selectCurrentFaculty } from "@/src/store/facultySlice";
import { useAppSelector } from "@/src/store/store";
import clsx from "clsx";
import { useState } from "react";
import { ExtensionButton } from "../IconButton/ExtensionButton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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

  const { isMobile } = useIsMobileViewport();

  const nav = () => (
    <>
      <NavItem
        href="/"
        isSelected={pathname === "/"}
        isEnabled
        isMobile={isMobile}
        text="Home"
      >
        <FaHouse size={25} className={isMobile ? "text-medium" : ""} />
      </NavItem>
      <NavItem
        href="/faculty"
        isSelected={matchFaculty}
        isEnabled
        isMobile={isMobile}
        text="Faculties"
      >
        <FaUniversity size={25} className={isMobile ? "text-medium" : ""} />
      </NavItem>
      <NavItem
        href={coursesPath}
        isSelected={matchCourse}
        isEnabled={isCoursesEnabled}
        isMobile={isMobile}
        text="Courses"
      >
        <FaGraduationCap size={25} className={isMobile ? "text-medium" : ""} />
      </NavItem>
      <NavItem
        href={assignmentsPath}
        isSelected={matchAssignment}
        isEnabled={isAssignmentsEnabled}
        isMobile={isMobile}
        text="Assignments"
      >
        <FaFileSignature size={25} className={isMobile ? "text-medium" : ""} />
      </NavItem>
    </>
  );

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const mobile = () => {
    return (
      <>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button className="h-8 w-8 text-medium" onClick={toggleMenu}>
              <FaBars className="p-1" size={30} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-screen">
            <div className="z-50 flex h-[calc(100vh-61px)] w-screen flex-col gap-4 bg-white p-4">
              <div className="flex flex-col gap-1">
                <div className="h6 font-semibold text-primary-default">
                  Menu
                </div>
                <div className="flex flex-col" onClick={() => setIsOpen(false)}>
                  {nav()}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Logo />
        <ExtensionButton url={EXTENSION_URL} />
      </>
    );
  };

  const desktop = () => (
    <>
      <Logo />
      <div className="flex items-center gap-4 font-light">{nav()}</div>
      <div className="flex items-center gap-2 font-light">
        <ExtensionButton url={EXTENSION_URL} />
        <p>Get extension</p>
      </div>
    </>
  );

  return (
    <div
      className={clsx(
        "pt-safe sticky top-0 z-50 flex items-center justify-between bg-white",
        isMobile ? "shadow-default min-h-[60px] px-5" : "min-h-[62px] px-10"
      )}
    >
      {isMobile ? mobile() : desktop()}
    </div>
  );
};
