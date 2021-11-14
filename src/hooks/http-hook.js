import { useState, useCallback, useRef, useEffect, useContext } from 'react';
import { message } from 'antd';
import { AuthContext } from '../context/auth-context';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const activeHttpRequests = useRef([]);

  const auth = useContext(AuthContext);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      if (auth.token) {
        headers['Authorization'] = 'Bearer ' + auth.token;
      }
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        if (responseData.message) {
          message.success(responseData.message);
        }

        return responseData;
      } catch (err) {
        message.error(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, sendRequest };
};
