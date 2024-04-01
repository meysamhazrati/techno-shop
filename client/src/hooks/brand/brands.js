import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/brand";

const shouldRetry = ({ response }) => response.status !== 404;
const shouldRefetch = ({ state }) => state.error?.response?.status !== 404;

export default (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["brands"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    refetchOnMount: shouldRefetch,
    refetchOnReconnect: shouldRefetch,
    refetchOnWindowFocus: shouldRefetch,
    select: ({ pages }) => ({ brands: pages.flatMap(({ data }) => data.brands), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingBrands: isFetching, isBrandsError: isError, brands: data?.brands, total: data?.total, hasBrandsNextPage: hasNextPage, fetchBrandsNextPage: fetchNextPage };
};