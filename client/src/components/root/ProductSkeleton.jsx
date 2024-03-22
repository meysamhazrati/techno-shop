import Shimmer from "../Shimmer";

const ProductSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-skeleton">
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
        <div className="flex h-16 items-center justify-between gap-x-3 border-t border-skeleton pt-4">
          <div className="h-12 w-40 rounded-full bg-skeleton"></div>
          <div className="h-5 w-20 rounded-full bg-skeleton"></div>
        </div>
      </div>
      <Shimmer />
    </div>
  );
};

export default ProductSkeleton;