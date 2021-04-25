import { MutableRefObject, useEffect, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export const useResizeObserver = (
  callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void,
  element: MutableRefObject<any>
) => {
  const current = element && element.current;
  const observer = useRef<ResizeObserver>();

  useEffect(() => {
    if (current) {
      observer?.current?.unobserve(current as Element);
    }
    observer.current = new ResizeObserver(callback);
    observe();

    return () => {
      if (element?.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer?.current?.unobserve(element.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const observe = () => {
    if (element && element.current && observer.current) {
      observer.current.observe(element.current);
    }
  };
};

export default useResizeObserver;
