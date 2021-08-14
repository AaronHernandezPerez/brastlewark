import axios from 'axios';
import { useState, useEffect } from 'react';

function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | object | null>(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    const source = axios.CancelToken.source();
    axios
      .get(url, { cancelToken: source.token })
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, loading, error, setError };
}

export default useFetch;
