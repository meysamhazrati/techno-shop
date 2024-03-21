import Shimmer from "../Shimmer";

const CategorySkeleton = () => {
  return (
    <div className="relative flex flex-col items-center gap-y-3 overflow-hidden">
      <div className="size-32 rounded-full bg-skeleton"></div>
      <div className="h-4 w-20 rounded-full bg-skeleton"></div>
      <Shimmer />
    </div>
  );
};

export default CategorySkeleton;