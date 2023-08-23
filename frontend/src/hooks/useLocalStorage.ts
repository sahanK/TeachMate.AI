import { useEffect, useState } from "react"

const useLocalStorage = (key: string) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (window) {
      const storageItem = window.localStorage.getItem(key);
      if (storageItem) {
        const storageObject = JSON.parse(storageItem ?? '');
        setData(storageObject);
      }
    }
  }, [key]);

  useEffect(() => {
    if (data && window) {
      window.localStorage.setItem(key, JSON.stringify(data));
    }
  }, [data, key]);

  return { data, setData }
};

export default useLocalStorage;