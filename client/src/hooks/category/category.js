import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "../../axios/controllers/category";

const shouldRetry = ({ response }) => response.status !== 404;
const shouldRefetch = ({ state }) => state.error?.response?.status !== 404;

export default (title, productsBrands, onlyAvailableProducts, onlyAmazingProducts, productsRange, productsSort, productsLength) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["category", { title, "products-brands": productsBrands, "only-available-products": onlyAvailableProducts, "only-amazing-products": onlyAmazingProducts, "products-range": productsRange, "products-sort": productsSort }],
    queryFn: ({ pageParam }) => get(title, productsBrands, onlyAvailableProducts, onlyAmazingProducts, productsRange, productsSort, pageParam, productsLength),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextProductsPage,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    refetchOnMount: shouldRefetch,
    refetchOnReconnect: shouldRefetch,
    refetchOnWindowFocus: shouldRefetch,
    select: ({ pages }) => ({ ...pages[pages.length - 1].data, products: pages.flatMap(({ data }) => data.products), totalProducts: pages[pages.length - 1].data.totalProducts }),
  });

  return { isFetchingCategory: isFetching, isCategoryError: isError, category: data, hasCategoryNextPage: hasNextPage, fetchCategoryNextPage: fetchNextPage };
};