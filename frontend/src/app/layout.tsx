import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import { FC, PropsWithChildren } from "react";
import { getAssignmentByCode } from "../api/assignment";
import { getCourseByCode } from "../api/course";
import { getFacultyByCode } from "../api/faculty";
import { getRecordByID } from "../api/record";
import { NavBar } from "../components/NavBar";
import { Toaster } from "../components/ui/toaster";
import { getPathname } from "../utils/getPathname";
import "./globals.css";
import { LoadState } from "./LoadState";
import Providers from "./providers";

const IBMPlex = IBM_Plex_Sans_Thai({
  weight: ["100", "300", "400", "600", "700"],
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: "ourcourseville",
  description: "Seizing the means of learning",
};

export const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const pathParts = getPathname().split("/");

  const facultyCode = pathParts.length >= 2 ? pathParts[2] : "";
  const currentFaculty_ = await getFacultyByCode(facultyCode);
  const currentFaculty =
    currentFaculty_ instanceof Error ? undefined : currentFaculty_;

  const courseCode = pathParts.length >= 4 ? pathParts[4] : "";
  const currentCourse_ = await getCourseByCode(courseCode);
  const currentCourse =
    currentCourse_ instanceof Error ? undefined : currentCourse_;

  const assignmentCode = pathParts.length >= 6 ? pathParts[6] : "";
  const currentAssignment_ = await getAssignmentByCode(assignmentCode);
  const currentAssignment =
    currentAssignment_ instanceof Error ? undefined : currentAssignment_;

  const recordID = pathParts.length >= 8 ? pathParts[8] : "";
  const currentRecord_ = await getRecordByID(recordID);
  const currentRecord =
    currentRecord_ instanceof Error ? undefined : currentRecord_;

  return (
    <html lang="en">
      <link
        rel="icon"
        type="image/png"
        href="/favicon/favicon-48x48.png"
        sizes="48x48"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <body
        className={`${IBMPlex.className} max-w-screen bg-default flex min-h-screen flex-col`}
      >
        <Providers>
          <LoadState
            currentFaculty={currentFaculty}
            currentCourse={currentCourse}
            currentAssignment={currentAssignment}
            currentRecord={currentRecord}
          />
          <NavBar />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
