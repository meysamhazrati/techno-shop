import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "../../axios/controllers/offer";

const shouldRetry = ({ response }) => response.status !== 404;
const shouldRefetch = ({ state }) => state.error?.response?.status !== 404;

export default (title, productsBrands, productsCategories, productsPrice, onlyAvailableProducts, productsSort, productsLength) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["offer", { title, "products-brands": productsBrands, "products-categories": productsCategories, "products-price": productsPrice, "only-available-products": onlyAvailableProducts, "products-sort": productsSort }],
    queryFn: ({ pageParam }) => get(title, productsBrands, productsCategories, productsPrice, onlyAvailableProducts, productsSort, pageParam, productsLength),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextProductsPage,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    refetchOnMount: shouldRefetch,
    refetchOnReconnect: shouldRefetch,
    refetchOnWindowFocus: shouldRefetch,
    select: ({ pages }) => ({ ...pages[pages.length - 1].data, products: pages.flatMap(({ data }) => data.products), totalProducts: pages[pages.length - 1].data.totalProducts }),
  });

  return { isFetchingOffer: isFetching, isOfferError: isError, offer: data, hasOfferNextPage: hasNextPage, fetchOfferNextPage: fetchNextPage };
};