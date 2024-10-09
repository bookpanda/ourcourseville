import { FaChalkboard } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

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
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 max-lg:flex-col-reverse">
              <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-3 max-lg:w-full">
                <div className="flex justify-between gap-4">
                  <div className="flex w-full items-center gap-2">
                    <FaChalkboard className="h-5 w-5 text-secondary-default max-lg:h-4 max-lg:w-4" />
                    <div className="text-lg font-semibold text-high max-lg:text-base">
                      Recent
                    </div>
                  </div>
                </div>
                <div
                  data-orientation="horizontal"
                  role="separator"
                  className="border-disable h-px border-b"
                />
                <div className="grid grid-cols-3 gap-2 overflow-x-auto pt-2 max-md:flex">
                  recent courses
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
