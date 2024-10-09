import { useEffect } from "react";
import { cache } from "../cache/localStorage";
import { selectRecentCourses, setRecentCourses } from "../store/courseSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Course } from "../types";

export const useGetRecentCourses = () => {
  const dispatch = useAppDispatch();
  const recentCourses = useAppSelector(selectRecentCourses);

  useEffect(() => {
    const res = cache.getItem<Course[]>("recentCourses");
    if (res) {
      dispatch(setRecentCourses(res));
      return;
    }
  }, []);

  return { recentCourses };
};
