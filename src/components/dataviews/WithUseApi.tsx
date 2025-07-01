import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';

export interface UseApiResult<T>  {
  data : T | null;
  loading : boolean;
  error : AxiosError | null;
  setData : React.Dispatch<React.SetStateAction<T | null>> | null;
}

/**
 * @component WithUseApi
 * @brief React hook that performs an HTTP request via axios and keeps
 *        track of its loading / error / data state.
 *        This hook can be used to greatly simplify fetching data
 *        from API endpoints that will be displayed in the UI.
 *
 * @template T            Expected response type.
 * @param config          Standard AxiosRequestConfig (url, method, headers, etc.).
 * @param deps            React deps to control when the request re-fires.
 * @return                Current server data, loading flag, error (if any) and
 *                        a manual setter for optimistic updates.
 */
export function WithUseApi<T>(
  config : AxiosRequestConfig,
  deps : React.DependencyList = []
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() =>
  {
    const source = axios.CancelToken.source();

    (async () =>
    {
      try
      {
        setLoading(true);

        const response = await axios.request<T>({
          cancelToken: source.token,
          ...config
        });

        const ct = response.headers['content-type'] ?? '';
        if(!ct.includes('application/json')) {
          throw new Error(`Expected JSON, got ${ct || 'unknown type'}`);
        }

        setData(response.data);
        setError(null);
      }
      catch(err)
      {
        if(!axios.isCancel(err))
        {
          setError(err as AxiosError);
        }
      }
      finally
      {
        setLoading(false);
      }
    })();

    return () => source.cancel('Component unmounted');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, setData };
}
