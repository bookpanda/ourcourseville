import { FaHouse } from "react-icons/fa6";
import { getAllFaculty } from "../api/faculty";
import { HowTo } from "./HowTo";
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
          <HowTo />
        </div>
      </div>
    </main>
  );
};

export default Home;
