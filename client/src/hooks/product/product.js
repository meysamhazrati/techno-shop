import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "../../axios/controllers/product";

const shouldRetry = ({ response }) => response.status !== 404;
const shouldRefetch = ({ state }) => state.error?.response?.status !== 404;

export default (id, commentsLength) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["product", { id }],
    queryFn: ({ pageParam }) => get(id, pageParam, commentsLength),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextCommentsPage,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    refetchOnMount: shouldRefetch,
    refetchOnReconnect: shouldRefetch,
    refetchOnWindowFocus: shouldRefetch,
    select: ({ pages }) => ({ ...pages[pages.length - 1].data, comments: pages.flatMap(({ data }) => data.comments), totalComments: pages[pages.length - 1].data.totalComments }),
  });

  return { isFetchingProduct: isFetching, isProductError: isError, product: data, hasProductNextPage: hasNextPage, fetchProductNextPage: fetchNextPage };
};