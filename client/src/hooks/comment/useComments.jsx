import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/comment";

const useComments = (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    select: ({ pages }) => ({ comments: pages.flatMap(({ data }) => data.comments), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingComments: isFetching, isCommentsError: isError, comments: data?.comments, totalComments: data?.total, hasCommentsNextPage: hasNextPage, fetchCommentsNextPage: fetchNextPage };
};

export default useComments;