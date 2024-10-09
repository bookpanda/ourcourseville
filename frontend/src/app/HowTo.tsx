import { FaListCheck } from "react-icons/fa6";

export const HowTo = () => {
  return (
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
      <div className="flex flex-col gap-2 overflow-x-auto pt-2 max-md:flex">
        <li>Download and unzip the extension from this web</li>
        <li>
          Go to{" "}
          <span className="text-primary-default">chrome://extensions/</span>{" "}
          (you can copy and paste this link in your browser)
        </li>
        <li>
          Click <span className="text-primary-default">Load unpacked</span> and
          select the unzipped folder
        </li>
        <li>Now you can share your ideas with your friends</li>
      </div>
    </div>
  );
};
