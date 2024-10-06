import { useEffect, useState } from "react";
import { getRecordByAssignment } from "../api/record";
import { Record } from "../types";

export const useGetRecordByAssignment = (asgmCode: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const res = await getRecordByAssignment(asgmCode);
      if (res instanceof Error) {
        return setError(res);
      }

      res.sort((a, b) => a.id.localeCompare(b.id));

      setRecords(res);
    })();

    setLoading(false);
  }, [asgmCode]);

  return { records, loading, error };
};
