import { useEffect, useState } from "react";
import { getRecordByID } from "../api/record";
import { selectCurrentRecord, setCurrentRecord } from "../store/recordSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export const useGetRecordByID = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useAppDispatch();
  const currentRecord = useAppSelector(selectCurrentRecord);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const res = await getRecordByID(id);
      if (res instanceof Error) {
        return setError(res);
      }

      dispatch(setCurrentRecord(res));
    })();

    setLoading(false);
  }, [id]);

  return { currentRecord, loading, error };
};
