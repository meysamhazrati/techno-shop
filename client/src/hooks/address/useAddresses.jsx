import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/address";

const useAddresses = (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["addresses"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    select: ({ pages }) => ({ addresses: pages.flatMap(({ data }) => data.addresses), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingAddresses: isFetching, isAddressesError: isError, addresses: data?.addresses, total: data?.total, hasAddressesNextPage: hasNextPage, fetchAddressesNextPage: fetchNextPage };
};

export default useAddresses;