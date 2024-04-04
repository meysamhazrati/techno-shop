import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/product";

const shouldRetry = ({ response }) => response.status !== 404;
const shouldRefetch = ({ state }) => state.error?.response?.status !== 404;

export default (search, brands, categories, price, onlyAvailable, onlyAmazing, sort, length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products", { search, brands, categories, price, "only-available": onlyAvailable, "only-amazing": onlyAmazing, sort }],
    queryFn: ({ pageParam }) => getAll(search, brands, categories, price, onlyAvailable, onlyAmazing, sort, pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    refetchOnMount: shouldRefetch,
    refetchOnReconnect: shouldRefetch,
    refetchOnWindowFocus: shouldRefetch,
    select: ({ pages }) => ({ products: pages.flatMap(({ data }) => data.products), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingProducts: isFetching, isProductsError: isError, products: data?.products, total: data?.total, hasProductsNextPage: hasNextPage, fetchProductsNextPage: fetchNextPage };
};