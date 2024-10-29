import { useEffect, useMemo, useRef, useState } from 'react';

export function useDebouncedState<T>(
  defaultValue: T,
  wait: number = 300,
  options = { leading: false },
) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(false);

  const leadingRef = useRef(true);
  const timeoutRef = useRef<number>(0);

  const clearTimeout = () => window.clearTimeout(timeoutRef.current);

  useEffect(() => clearTimeout, []);

  const debouncedSetValue = (newValue: T) => {
    clearTimeout();
    if (leadingRef.current && options.leading) {
      setValue(newValue);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        leadingRef.current = true;
        setValue(newValue);
        setLoading(false);
      }, wait);
    }
    leadingRef.current = false;
  };

  const state = useMemo(
    () => ({
      value,
      loading,
    }),
    [value, loading],
  );

  const handlers = useMemo(
    () => ({
      debouncedSetValue,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return [state, handlers] as const;
}
