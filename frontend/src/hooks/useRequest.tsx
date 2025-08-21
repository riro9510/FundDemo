import {useState, useCallback, useMemo} from 'react';
import {Request} from '../models/RequestClass';

export function useRequest<TReq extends Request<any>, TResult = any>(
  createRequest: (...args: any[]) => TReq,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const send = useCallback(
    async (...args: any[]): Promise<TResult | null> => {
      setLoading(true);
      try {
        const request = createRequest(...args);
        const result = await request.send();
        return result;
      } catch (err: any) {
       throw err;
        return error;
      } finally {
        setLoading(false);
      }
    },
    [createRequest],
  );

  return {send, loading, error};
}
