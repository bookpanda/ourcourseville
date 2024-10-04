import { FaUniversity } from "react-icons/fa";
import { FaFileSignature, FaGraduationCap, FaHouse } from "react-icons/fa6";

import { HeaderItem } from "./HeaderItem";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <div className="sticky top-0 z-50 flex min-h-[62px] items-center justify-between bg-white px-10">
      <Logo />
      <div className="flex items-center gap-4">
        <HeaderItem href="/" isSelected={true}>
          <FaHouse size={25} />
          Home
        </HeaderItem>
        <HeaderItem href="/faculty" isSelected={false}>
          <FaUniversity size={25} />
          Faculties
        </HeaderItem>
        <HeaderItem href="/course" isSelected={false}>
          <FaGraduationCap size={25} /> Courses
        </HeaderItem>
        <HeaderItem href="/assignment" isSelected={false}>
          <FaFileSignature size={25} /> Assignments
        </HeaderItem>
      </div>
      <div className="flex items-center gap-4"></div>
    </div>
  );
};
