import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/product";

const shouldRetry = (error) => error.response.status !== 404;
const shouldRefetch = ({ state }) => state.error?.response?.status !== 404;

export default (sort, length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products", sort],
    queryFn: ({ pageParam }) => getAll(sort, pageParam, length),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    refetchOnMount: shouldRefetch,
    refetchOnReconnect: shouldRefetch,
    refetchOnWindowFocus: shouldRefetch,
    select: (data) => data.pages.flatMap((page) => page.data.products),
  });

  return { isFetchingProducts: isFetching, isProductsError: isError, products: data, hasProductsNextPage: hasNextPage, fetchProductsNextPage: fetchNextPage };
};