import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthContext } from './useAuthContext';

interface FetchResponse<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const useAxiosFetch = <T>(
  url: string,
  method: RequestMethod = 'GET',
  config?: AxiosRequestConfig,
): FetchResponse<T> => {
  const { user } = useAuthContext();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (user?.emailVerified) {
          const idToken = await user.getIdToken();

          const response: AxiosResponse<T> = await axios.request({
            method,
            url,
            data: config?.data,
            headers: {
              ...config?.headers,
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (isMounted) {
            setData(response.data);
            setError(null);
          }
        } else {
          throw new Error('User has not verified his email');
        }
      } catch (error) {
        if (isMounted) {
          setError(error as Error);
          setData(null);
        }
      }
      if (isMounted) {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, method, config, user]);

  return { data, error, isLoading };
};

export default useAxiosFetch;