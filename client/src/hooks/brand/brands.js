import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/brand";

const shouldRetry = (error) => error.response.status !== 404;
const shouldRefetch = ({ state }) => state.error?.response?.status !== 404;

export default (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["brands"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    refetchOnMount: shouldRefetch,
    refetchOnReconnect: shouldRefetch,
    refetchOnWindowFocus: shouldRefetch,
    select: (data) => data.pages.flatMap((page) => page.data.brands),
  });

  return { isFetchingBrands: isFetching, isBrandsError: isError, brands: data, hasBrandsNextPage: hasNextPage, fetchBrandsNextPage: fetchNextPage };
};