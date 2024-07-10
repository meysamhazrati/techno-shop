import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/ticket";

const useTickets = (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["tickets"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    select: ({ pages }) => ({ tickets: pages.flatMap(({ data }) => data.tickets), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingTickets: isFetching, isTicketsError: isError, tickets: data?.tickets, total: data?.total, hasTicketsNextPage: hasNextPage, fetchTicketsNextPage: fetchNextPage };
};

export default useTickets;