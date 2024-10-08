import { FaFileSignature } from "react-icons/fa6";
import { AssignmentTile } from "./components/AssignmentTile";

export default function Popup(): JSX.Element {
  return (
    <div className="m-4 flex flex-col gap-4 bg-white p-2 lg:mx-8 lg:my-6 lg:p-6">
      <div className="flex items-center gap-2 border-0 pb-0 font-semibold">
        <FaFileSignature
          size={25}
          className="text-secondary-default lg:text-lg"
        />
        <p className="h4 lg:h3 text-high">Assignments</p>
      </div>
      <div className="flex w-full flex-col gap-3">
        <AssignmentTile href="hi" />
      </div>
    </div>
  );
}
