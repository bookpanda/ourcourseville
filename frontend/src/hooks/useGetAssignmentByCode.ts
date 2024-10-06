import { useEffect, useState } from "react";
import { getAssignmentByCode } from "../api/assignment";
import {
  selectCurrentAssignment,
  setCurrentAssignment,
} from "../store/assignmentSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export const useGetAssignmentByCode = (code: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useAppDispatch();
  const currentAssignment = useAppSelector(selectCurrentAssignment);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const res = await getAssignmentByCode(code);
      if (res instanceof Error) {
        return setError(res);
      }

      dispatch(setCurrentAssignment(res));
    })();

    setLoading(false);
  }, [code]);

  return { currentAssignment, loading, error };
};
