import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/offer";

const useOffers = (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["offers"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    select: ({ pages }) => ({ offers: pages.flatMap(({ data }) => data.offers), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingOffers: isFetching, isOffersError: isError, offers: data?.offers, totalOffers: data?.total, hasOffersNextPage: hasNextPage, fetchOffersNextPage: fetchNextPage };
};

export default useOffers;