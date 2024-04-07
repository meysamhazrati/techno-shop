import { useRef, useEffect } from "react";

const InfiniteScroll = ({ hasNextPage, fetchNextPage, children }) => {
  const observerTarget = useRef();

  useEffect(() => {
    const target = observerTarget.current;
    const observer = new IntersectionObserver((entries) => entries[0].isIntersecting && hasNextPage && fetchNextPage());

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [hasNextPage, fetchNextPage]);

  return (
    <>
      {children}
      <div ref={observerTarget}></div>
    </>
  );
};

export default InfiniteScroll;