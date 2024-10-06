import { useEffect, useState } from "react";
import { getAssignmentByCode } from "../api/assignment";
import { Assignment } from "../types";

export const useGetAssignmentByCode = (code: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>();

  useEffect(() => {
    setLoading(true);

    (async () => {
      const res = await getAssignmentByCode(code);
      if (res instanceof Error) {
        return setError(res);
      }

      setAssignment(res);
    })();

    setLoading(false);
  }, [code]);

  return { assignment, loading, error };
};
