import { useQuery } from "@tanstack/react-query";
import { get } from "../../axios/controllers/user";

const useUser = (id) => {
  const { isFetching, isError, data } = useQuery({
    queryKey: ["users", { id }],
    queryFn: () => get(id),
    select: ({ data }) => data,
  });

  return { isFetchingUser: isFetching, isUserError: isError, user: data };
};

export default useUser;