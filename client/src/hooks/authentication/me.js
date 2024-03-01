import { useQuery } from "@tanstack/react-query";
import { me } from "../../axios/controllers/authentication";

const shouldRetry = (error) => !/401|403|404/.test(error.response.status);
const shouldRefetch = ({ state }) => !/401|403|404/.test(state.error?.response?.status);

export default () => {
  const { isPending, isFetching, isError, data } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    staleTime: 1000 * 60,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    refetchOnMount: shouldRefetch,
    refetchOnReconnect: shouldRefetch,
    refetchOnWindowFocus: shouldRefetch,
    select: (data) => data.data,
  });

  return { isPending, isFetching, isError, data };
};