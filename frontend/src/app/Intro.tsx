import { FaQuestion } from "react-icons/fa";

export const Intro = () => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-3 max-lg:h-auto lg:min-h-[356px] lg:py-4">
      <div className="flex justify-between gap-4">
        <div className="flex w-full items-center gap-2">
          <FaQuestion className="h-5 w-5 text-secondary-default max-lg:h-4 max-lg:w-4" />
          <div className="text-lg font-semibold text-high max-lg:text-base">
            What is OurCourseVille
          </div>
        </div>
      </div>
      <div
        data-orientation="horizontal"
        role="separator"
        className="border-disable h-px border-b"
      />
      <div className="flex flex-col gap-2 overflow-x-auto pt-2 max-md:flex">
        <li>Tired of taking screenshots of assignments?</li>
        <li>
          You can now "Share solution" of your assignment using our Chrome
          extension
        </li>
        <li>Share once, learn anywhere</li>
        <li>
          We do NOT condone any form of cheating or plagiarism, we only provide
          a platform for students to collaborate and share their ideas.
        </li>
        <li>
          We do NOT collect any Personally Identifiable Information data from
          you, we only collect solutions to the assignments.
        </li>
      </div>
    </div>
  );
};
