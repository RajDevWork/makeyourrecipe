import { useState, useEffect, useCallback, useRef } from 'react';

const useInfiniteScroll = (fetchMore, hasMore) => {
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, fetchMore]
  );

  return { lastElementRef, isLoading, setIsLoading };
};

export default useInfiniteScroll;