import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/brand";

const useBrands = (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["brands"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    select: ({ pages }) => ({ brands: pages.flatMap(({ data }) => data.brands), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingBrands: isFetching, isBrandsError: isError, brands: data?.brands, total: data?.total, hasBrandsNextPage: hasNextPage, fetchBrandsNextPage: fetchNextPage };
};

export default useBrands;