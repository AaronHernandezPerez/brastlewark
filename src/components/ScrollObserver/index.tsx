import { useEffect, useCallback, useRef } from 'react';
declare global {
  interface Window {
    xd: any[];
  }
}
const ScrollObserver = ({
  onIntersect,
  rootMargin = '500px',
}: {
  onIntersect: Function;
  rootMargin?: string;
}) => {
  const loader = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      console.log('handleObserver', entries);
      if (target.isIntersecting) {
        onIntersect();
      }
    },
    [onIntersect]
  );

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0,
      rootMargin,
    };
    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleObserver, rootMargin]);

  return <div ref={loader} />;
};

export default ScrollObserver;
