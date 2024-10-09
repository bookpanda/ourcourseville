import { FaListCheck } from "react-icons/fa6";

export const HowTo = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-4 max-lg:flex-col">
      <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-3 max-lg:h-auto lg:min-h-[356px] lg:py-4">
        <div className="flex justify-between gap-4">
          <div className="flex w-full items-center gap-2">
            <FaListCheck className="h-5 w-5 text-secondary-default max-lg:h-4 max-lg:w-4" />
            <div className="text-lg font-semibold text-high max-lg:text-base">
              How to use extension
            </div>
          </div>
        </div>
        <div
          data-orientation="horizontal"
          role="separator"
          className="border-disable h-px border-b"
        />
      </div>
    </div>
  );
};
