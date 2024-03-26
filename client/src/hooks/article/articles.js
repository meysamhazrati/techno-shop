import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/article";

const shouldRetry = (error) => error.response.status !== 404;
const shouldRefetch = ({ state }) => state.error?.response?.status !== 404;

export default (categories, sort, length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["articles", categories, sort],
    queryFn: ({ pageParam }) => getAll(categories, sort, pageParam, length),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    refetchOnMount: shouldRefetch,
    refetchOnReconnect: shouldRefetch,
    refetchOnWindowFocus: shouldRefetch,
    select: (data) => data.pages.flatMap((page) => page.data.articles),
  });

  return { isFetchingArticles: isFetching, isArticlesError: isError, articles: data, hasArticlesNextPage: hasNextPage, fetchArticlesNextPage: fetchNextPage };
};