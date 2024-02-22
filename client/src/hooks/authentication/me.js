import { useQuery } from "@tanstack/react-query";
import { me } from "../../axios/controllers/authentication";

const isClientError = ({ state }) => !/401|403|404/.test(state.error?.response?.status);

export default () => {
  const { isFetching, isError, data } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    staleTime: 1000 * 60,
    retry: (failureCount, error) => isClientError({ state: { error } }) && failureCount < 2,
    refetchOnMount: isClientError,
    refetchOnReconnect: isClientError,
    refetchOnWindowFocus: isClientError,
    select: (data) => data.data,
  });

  return { isFetching, isError, data };
};