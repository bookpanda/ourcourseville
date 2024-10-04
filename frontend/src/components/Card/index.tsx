import Image from "next/image";
import Link from "next/link";

export const Card = () => {
  return (
    <Link href="?" className="w-full">
      <div className="border-disable m-0 flex w-full min-w-[188px] cursor-pointer flex-col gap-2 rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 ease-in-out hover:translate-y-[-4px] hover:shadow-md">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <Image
              src={"/course-test.png"}
              alt="logo"
              className="h-[60px] w-[60px] rounded-full"
              unoptimized
              width={60}
              height={60}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="text-secondary-default text-sm font-semibold">
                3401102
              </div>
              <div className="text-high font-ibmplex line-clamp-3 h-[72px] text-base font-semibold">
                Tax Law in Daily Life [Section 71]
              </div>
            </div>
            <ul className="flex h-[26px] flex-row gap-2"></ul>
          </div>
        </div>
        <div className="bg-dark h-[1px] w-full rounded-full"></div>
      </div>
    </Link>
  );
};
