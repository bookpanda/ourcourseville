import { useEffect, useState } from "react";
import { getAssignmentByCourse } from "../api/assignment";
import { cache } from "../cache/localStorage";
import { COURSE_TTL } from "../config/config";
import { Assignment } from "../types";

export const useGetAssignmentByCourse = (courseCode: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const cacheKey = `assignement-from-course-${courseCode}`;

  useEffect(() => {
    setLoading(true);

    const res = cache.getItem<Assignment[]>(cacheKey);
    if (res) {
      setAssignments(res);
      setLoading(false);
      return;
    }

    (async () => {
      const res = await getAssignmentByCourse(courseCode);
      if (res instanceof Error) {
        return setError(res);
      }

      res.sort((a, b) => a.code.localeCompare(b.code));

      cache.setItem(cacheKey, res, COURSE_TTL);
      setAssignments(res);
    })();

    setLoading(false);
  }, [cacheKey, courseCode]);

  return { assignments, loading, error };
};
