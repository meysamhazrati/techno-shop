import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/order";

const useOrders = (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    select: ({ pages }) => ({ orders: pages.flatMap(({ data }) => data.orders), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingOrders: isFetching, isOrdersError: isError, orders: data?.orders, total: data?.total, hasOrdersNextPage: hasNextPage, fetchOrdersNextPage: fetchNextPage };
};

export default useOrders;