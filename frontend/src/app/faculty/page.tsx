import { Header } from "@/src/components/Header";

export default function FacultyPage() {
  return (
    <main>
      <div className="mx-auto my-4 max-w-[1440px] space-y-4 px-4 sm:px-8 md:w-4/5 md:px-0 lg:my-8">
        <div className="flex h-fit w-full items-center justify-between gap-3 max-md:flex-col max-md:items-start">
          <Header title="My Courses" />
        </div>
      </div>
    </main>
  );
}
