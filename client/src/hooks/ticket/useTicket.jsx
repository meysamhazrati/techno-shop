import { useQuery } from "@tanstack/react-query";
import { get } from "../../axios/controllers/ticket";

const useTicket = (id) => {
  const { isFetching, isError, data } = useQuery({
    queryKey: ["tickets", { id }],
    queryFn: () => get(id),
    select: ({ data }) => data,
  });

  return { isFetchingTicket: isFetching, isTicketError: isError, ticket: data };
};

export default useTicket;