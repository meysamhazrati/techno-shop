import { useQuery } from "@tanstack/react-query";
import { me } from "../../axios/controllers/authentication";

const useMe = () => {
  const { isPending, isFetching, isError, data } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: false,
    select: ({ data }) => data,
  });

  return { isPendingMe: isPending, isFetchingMe: isFetching, isMeError: isError, me: data };
}

export default useMe;