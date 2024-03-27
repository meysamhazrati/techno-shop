const ArticleSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-3xl bg-white">
      <div className="animate-pulse">
        <div className="h-48 w-full bg-skeleton"></div>
        <div className="p-4">
          <div className="flex h-16 flex-col justify-center gap-y-3">
            <div className="h-5 w-full rounded-full bg-skeleton"></div>
            <div className="h-5 w-full rounded-full bg-skeleton"></div>
          </div>
          <div className="my-4 flex h-7 items-center justify-between gap-x-3">
            <div className="h-5 w-20 rounded-full bg-skeleton"></div>
            <div className="h-5 w-14 rounded-full bg-skeleton"></div>
          </div>
          <div className="flex h-11 items-center justify-center gap-x-3 border-t border-skeleton pt-4">
            <div className="h-6 w-24 rounded-full bg-skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;