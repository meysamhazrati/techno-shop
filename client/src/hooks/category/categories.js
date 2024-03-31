import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/category";

const shouldRetry = ({ response }) => response.status !== 404;
const shouldRefetch = ({ state }) => state.error?.response?.status !== 404;

export default (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    refetchOnMount: shouldRefetch,
    refetchOnReconnect: shouldRefetch,
    refetchOnWindowFocus: shouldRefetch,
    select: ({ pages }) => ({ categories: pages.flatMap(({ data }) => data.categories), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingCategories: isFetching, isCategoriesError: isError, categories: data?.categories, total: data?.total, hasCategoriesNextPage: hasNextPage, fetchCategoriesNextPage: fetchNextPage };
};