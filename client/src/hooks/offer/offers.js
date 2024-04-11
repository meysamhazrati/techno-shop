import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/offer";

const shouldRetry = ({ response }) => response.status !== 404;
const shouldRefetch = ({ state }) => state.error?.response?.status !== 404;

export default (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["offers"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    refetchOnMount: shouldRefetch,
    refetchOnReconnect: shouldRefetch,
    refetchOnWindowFocus: shouldRefetch,
    select: ({ pages }) => ({ offers: pages.flatMap(({ data }) => data.offers), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingOffers: isFetching, isOffersError: isError, offers: data?.offers, total: data?.total, hasOffersNextPage: hasNextPage, fetchOffersNextPage: fetchNextPage };
};