import { useEffect, useState } from "react";
import { getAssignmentByCourse } from "../api/assignment";
import { selectAssignments, setAssignments } from "../store/assignmentSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export const useGetAssignmentByCourse = (courseCode: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useAppDispatch();
  const assignments = useAppSelector(selectAssignments);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const res = await getAssignmentByCourse(courseCode);
      if (res instanceof Error) {
        return setError(res);
      }

      res.sort((a, b) => a.code.localeCompare(b.code));

      dispatch(setAssignments(res));
    })();

    setLoading(false);
  }, [courseCode]);

  return { assignments, loading, error };
};
