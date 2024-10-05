import { useEffect, useState } from "react";
import { getAssignmentByCode } from "../api/assignment";
import { cache } from "../cache/localStorage";
import { COURSE_TTL } from "../config/config";
import { Assignment } from "../types";

export const useGetAssignmentByCode = (code: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>();

  const cacheKey = `assignment-from-code-${code}`;

  useEffect(() => {
    setLoading(true);

    const res = cache.getItem<Assignment>(cacheKey);
    if (res) {
      setAssignment(res);
      setLoading(false);
      return;
    }

    (async () => {
      const res = await getAssignmentByCode(code);
      if (res instanceof Error) {
        return setError(res);
      }

      cache.setItem(cacheKey, res, COURSE_TTL);
      setAssignment(res);
    })();

    setLoading(false);
  }, [cacheKey, code]);

  return { assignment, loading, error };
};
