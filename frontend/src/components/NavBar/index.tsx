import { FaUniversity } from "react-icons/fa";
import { FaFileSignature, FaGraduationCap, FaHouse } from "react-icons/fa6";

import { Logo } from "./Logo";
import { NavItem } from "./NavItem";

export const NavBar = () => {
  return (
    <div className="sticky top-0 z-50 flex min-h-[62px] items-center justify-between bg-white px-10">
      <Logo />
      <div className="flex items-center gap-4">
        <NavItem href="/" isSelected={true}>
          <FaHouse size={25} />
          Home
        </NavItem>
        <NavItem href="/faculty" isSelected={false}>
          <FaUniversity size={25} />
          Faculties
        </NavItem>
        <NavItem href="/course" isSelected={false}>
          <FaGraduationCap size={25} /> Courses
        </NavItem>
        <NavItem href="/assignment" isSelected={false}>
          <FaFileSignature size={25} /> Assignments
        </NavItem>
      </div>
      <div className="flex items-center gap-4"></div>
    </div>
  );
};
