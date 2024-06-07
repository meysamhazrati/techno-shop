import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "../../axios/controllers/offer";

const useOffer = (title, productsBrands, productsCategories, productsPrice, onlyAvailableProducts, productsSort, productsLength) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["offers", { title, "products-brands": productsBrands, "products-categories": productsCategories, "products-price": productsPrice, "only-available-products": onlyAvailableProducts, "products-sort": productsSort }],
    queryFn: ({ pageParam }) => get(title, productsBrands, productsCategories, productsPrice, onlyAvailableProducts, productsSort, pageParam, productsLength),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextProductsPage,
    select: ({ pages }) => ({ ...pages[pages.length - 1].data, products: pages.flatMap(({ data }) => data.products), totalProducts: pages[pages.length - 1].data.totalProducts }),
  });

  return { isFetchingOffer: isFetching, isOfferError: isError, offer: data, hasOfferNextPage: hasNextPage, fetchOfferNextPage: fetchNextPage };
};

export default useOffer;