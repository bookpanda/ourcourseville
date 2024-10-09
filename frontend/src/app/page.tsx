import { FaHouse } from "react-icons/fa6";
import { getAllFaculty } from "../api/faculty";
import { HowTo } from "./HowTo";
import { Intro } from "./Intro";
import { RecentCourses } from "./RecentCourses";

const Home = async () => {
  const faculties = await getAllFaculty();
  if (faculties instanceof Error) {
    return <div>Error: {faculties.message}</div>;
  }

  return (
    <main>
      <div className="mx-auto max-w-[1440px] md:w-4/5">
        <div className="m-4 flex flex-col gap-4 lg:mx-0 lg:my-6">
          <div className="flex items-center gap-2">
            <FaHouse className="h-6 w-6 text-secondary-default" />
            <div className="text-2xl font-semibold text-high max-lg:text-xl">
              Home
            </div>
          </div>
          <RecentCourses faculties={faculties} />
          <div className="flex w-full flex-row items-center justify-between gap-4 max-lg:flex-col">
            <div className="flex w-[calc(50%-4px)] flex-col gap-2 rounded-lg bg-white p-3 max-lg:w-full lg:min-h-[356px] lg:py-4">
              <Intro />
            </div>
            <div className="h-full w-[calc(50%-4px)] max-lg:w-full">
              <HowTo />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
