import { HeaderItem } from "./HeaderItem";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <div className="sticky top-0 z-50 flex min-h-[62px] items-center justify-between bg-white px-10">
      <Logo />
      <div className="flex items-center gap-4">
        <HeaderItem href="/courses">Courses</HeaderItem>
        <HeaderItem href="/faculties">Faculties</HeaderItem>
      </div>
      <div className="flex items-center gap-4"></div>
    </div>
  );
};
