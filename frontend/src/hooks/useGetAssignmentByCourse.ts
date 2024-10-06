import { useEffect, useState } from "react";
import { getAssignmentByCourse } from "../api/assignment";
import { Assignment } from "../types";

export const useGetAssignmentByCourse = (courseCode: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const res = await getAssignmentByCourse(courseCode);
      if (res instanceof Error) {
        return setError(res);
      }

      res.sort((a, b) => a.code.localeCompare(b.code));

      setAssignments(res);
    })();

    setLoading(false);
  }, [courseCode]);

  return { assignments, loading, error };
};
