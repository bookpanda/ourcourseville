import { useEffect, useState } from "react";
import { getRecordByID } from "../api/record";
import { Record } from "../types";

export const useGetRecordByID = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [record, setRecord] = useState<Record | null>();

  useEffect(() => {
    setLoading(true);

    (async () => {
      const res = await getRecordByID(id);
      if (res instanceof Error) {
        return setError(res);
      }

      setRecord(res);
    })();

    setLoading(false);
  }, [id]);

  return { record, loading, error };
};
