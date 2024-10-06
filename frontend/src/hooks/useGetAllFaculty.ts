import { useEffect, useState } from "react";
import { getAllFaculty } from "../api/faculty";
import { cache } from "../cache/localStorage";
import { FACULTY_TTL } from "../config/config";
import { selectFaculties, setFaculties } from "../store/facultySlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Faculty } from "../types";

export const useGetAllFaculty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useAppDispatch();
  const faculties = useAppSelector(selectFaculties);

  useEffect(() => {
    setLoading(true);

    const res = cache.getItem<Faculty[]>("faculties");
    if (res) {
      dispatch(setFaculties(res));
      setLoading(false);
      return;
    }

    (async () => {
      const res = await getAllFaculty();
      if (res instanceof Error) {
        return setError(res);
      }

      res.sort((a, b) => a.code.localeCompare(b.code));

      cache.setItem("faculties", res, FACULTY_TTL);
      dispatch(setFaculties(res));
    })();

    setLoading(false);
  }, []);

  return { faculties, loading, error };
};
