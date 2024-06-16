import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/user";

const useUsers = (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    select: ({ pages }) => ({ users: pages.flatMap(({ data }) => data.users), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingUsers: isFetching, isUsersError: isError, users: data?.users, total: data?.total, hasUsersNextPage: hasNextPage, fetchUsersNextPage: fetchNextPage };
};

export default useUsers;