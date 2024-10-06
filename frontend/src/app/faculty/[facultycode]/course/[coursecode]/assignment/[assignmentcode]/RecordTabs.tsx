"use client";

import { Tab } from "@/src/components/Tab/Tab";
import { selectCurrentRecord } from "@/src/store/recordSlice";
import { useAppSelector } from "@/src/store/store";
import { usePathname } from "next/navigation";

export const RecordTabs = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const facultyCode = pathParts[2];
  const courseCode = pathParts[4];
  const assignmentCode = pathParts[6];
  const assignmentsPath = `/faculty/${facultyCode}/course/${courseCode}/assignment`;

  const currentRecord = useAppSelector(selectCurrentRecord);

  const currentTab = pathParts.length > 7 ? 1 : 0;
  const tabs = [
    {
      text: "Records",
      href: `${assignmentsPath}/${assignmentCode}`,
      isEnabled: true,
    },
    {
      text: "Solution",
      href: `${assignmentsPath}/${assignmentCode}/record/${currentRecord?.id}`,
      isEnabled: currentRecord !== null,
    },
  ];

  return <Tab currentIndex={currentTab} items={tabs} />;
};
