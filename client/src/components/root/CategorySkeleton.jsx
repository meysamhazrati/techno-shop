const CategorySkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col items-center gap-y-3">
      <div className="size-32 rounded-full bg-skeleton"></div>
      <div className="h-4 w-20 rounded-full bg-skeleton"></div>
    </div>
  );
};

export default CategorySkeleton;