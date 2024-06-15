import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/statistic";

const useStatistics = () => {
  const { isFetching, isError, data } = useQuery({
    queryKey: ["statistics"],
    queryFn: getAll,
    select: ({ data }) => data,
  });

  return { isFetchingStatistics: isFetching, isStatisticsError: isError, statistics: data };
};

export default useStatistics;