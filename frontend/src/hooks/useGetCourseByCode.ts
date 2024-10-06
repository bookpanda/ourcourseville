import { useEffect, useState } from "react";
import { getCourseByCode } from "../api/course";
import { cache } from "../cache/localStorage";
import { COURSE_TTL } from "../config/config";
import { selectCurrentCourse, setCurrentCourse } from "../store/courseSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Course } from "../types";

export const useGetCourseByCode = (code: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useAppDispatch();
  const currentCourse = useAppSelector(selectCurrentCourse);

  const cacheKey = `course-from-code-${code}`;

  useEffect(() => {
    setLoading(true);

    const res = cache.getItem<Course>(cacheKey);
    if (res) {
      dispatch(setCurrentCourse(res));
      setLoading(false);
      return;
    }

    (async () => {
      const res = await getCourseByCode(code);
      if (res instanceof Error) {
        return setError(res);
      }

      cache.setItem(cacheKey, res, COURSE_TTL);
      dispatch(setCurrentCourse(res));
    })();

    setLoading(false);
  }, [cacheKey, code]);

  return { currentCourse, loading, error };
};
