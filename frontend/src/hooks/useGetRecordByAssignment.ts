import { useEffect, useState } from "react";
import { getRecordByAssignment } from "../api/record";
import { selectRecords, setRecords } from "../store/recordSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export const useGetRecordByAssignment = (asgmCode: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useAppDispatch();
  const records = useAppSelector(selectRecords);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const res = await getRecordByAssignment(asgmCode);
      if (res instanceof Error) {
        return setError(res);
      }

      res.sort((a, b) => a.id.localeCompare(b.id));

      dispatch(setRecords(res));
    })();

    setLoading(false);
  }, [asgmCode]);

  return { records, loading, error };
};
