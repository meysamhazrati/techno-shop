import Shimmer from "../Shimmer";

const BrandSkeleton = () => {
  return (
    <div className="relative size-32 overflow-hidden rounded-full bg-skeleton">
      <Shimmer />
    </div>
  );
};

export default BrandSkeleton;