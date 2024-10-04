import { useEffect, useState } from "react";
import { getCourseByFaculty } from "../api/course";
import { cache } from "../cache/localStorage";
import { COURSE_TTL } from "../config/config";
import { Course } from "../types";

export const useGetCourseByFaculty = (facultyCode: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  const cacheKey = `course-from-faculty-${facultyCode}`;

  useEffect(() => {
    setLoading(true);

    const res = cache.getItem<Course[]>(cacheKey);
    if (res) {
      setCourses(res);
      setLoading(false);
      return;
    }

    (async () => {
      const res = await getCourseByFaculty(facultyCode);
      if (res instanceof Error) {
        return setError(res);
      }

      res.sort((a, b) => a.code.localeCompare(b.code));

      cache.setItem(cacheKey, res, COURSE_TTL);
      setCourses(res);
    })();

    setLoading(false);
  }, [cacheKey, facultyCode]);

  return { courses, loading, error };
};
