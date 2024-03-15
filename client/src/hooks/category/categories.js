import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/category";

const shouldRetry = (error) => error.response.status !== 404;
const shouldRefetch = ({ state }) => state.error?.response?.status !== 404;

export default (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    refetchOnMount: shouldRefetch,
    refetchOnReconnect: shouldRefetch,
    refetchOnWindowFocus: shouldRefetch,
    select: (data) => data.pages.flatMap((page) => page.data.categories),
  });

  return { isFetchingCategories: isFetching, isCategoriesError: isError, categories: data, hasCategoriesNextPage: hasNextPage, fetchCategoriesNextPage: fetchNextPage };
};