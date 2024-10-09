import { FaHouse } from "react-icons/fa6";
import { RecentCourses } from "./RecentCourses";

const Home = () => {
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
          <RecentCourses />
        </div>
      </div>
    </main>
  );
};

export default Home;
