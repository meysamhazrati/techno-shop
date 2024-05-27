import { useQuery } from "@tanstack/react-query";
import { get } from "../../axios/controllers/order";

const shouldRetry = ({ response }) => !/403|404/.test(response.status);
const shouldRefetch = ({ state }) => !/403|404/.test(state.error?.response?.status);

export default (id) => {
  const { isFetching, isError, data } = useQuery({
    queryKey: ["order", { id }],
    queryFn: () => get(id),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    refetchOnMount: shouldRefetch,
    refetchOnReconnect: shouldRefetch,
    refetchOnWindowFocus: shouldRefetch,
    select: ({ data }) => data,
  });

  return { isFetchingOrder: isFetching, isOrderError: isError, order: data };
};