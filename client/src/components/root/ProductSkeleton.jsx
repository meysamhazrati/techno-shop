import Shimmer from "../Shimmer";

const ProductSkeleton = () => {
  return (
    <div className="border-skeleton relative overflow-hidden rounded-3xl border">
      <div className="bg-skeleton h-48 w-full"></div>
      <div className="p-4">
        <div className="flex h-16 flex-col justify-center gap-y-3">
          <div className="bg-skeleton h-5 w-full rounded-full"></div>
          <div className="bg-skeleton h-5 w-full rounded-full"></div>
        </div>
        <div className="my-4 flex h-7 items-center justify-between">
          <div className="bg-skeleton h-5 w-20 rounded-full"></div>
          <div className="bg-skeleton h-5 w-14 rounded-full"></div>
        </div>
        <div className="border-skeleton border-t"></div>
        <div className="flex h-16 items-center justify-between pt-4">
          <div className="bg-skeleton h-12 w-40 rounded-full"></div>
          <div className="bg-skeleton h-5 w-20 rounded-full"></div>
        </div>
      </div>
      <Shimmer />
    </div>
  );
};

export default ProductSkeleton;