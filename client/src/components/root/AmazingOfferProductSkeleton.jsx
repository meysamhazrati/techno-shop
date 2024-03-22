import Shimmer from "../Shimmer";

const AmazingOfferProductSkeleton = () => {
  return (
    <div className="relative min-w-60 overflow-hidden border border-skeleton bg-white">
      <div className="relative h-48 w-full bg-skeleton">
        <div className="absolute right-4 top-4 h-7 w-12 rounded-full bg-white"></div>
      </div>
      <div className="p-3">
        <div className="flex h-14 flex-col justify-center gap-y-2.5">
          <div className="h-4 w-full rounded-full bg-skeleton"></div>
          <div className="h-4 w-full rounded-full bg-skeleton"></div>
        </div>
        <div className="mt-[7px] flex h-12 items-center justify-between border-t border-skeleton pt-2">
          <div className="flex flex-col items-center gap-y-1.5">
            <div className="h-3 w-28 rounded-full bg-skeleton"></div>
            <div className="h-3 w-16 rounded-full bg-skeleton"></div>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <div className="h-3 w-14 rounded-full bg-skeleton"></div>
            <div className="h-3 w-20 rounded-full bg-skeleton"></div>
          </div>
        </div>
      </div>
      <Shimmer />
    </div>
  );
};

export default AmazingOfferProductSkeleton;