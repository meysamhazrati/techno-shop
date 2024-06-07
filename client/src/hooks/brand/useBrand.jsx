import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "../../axios/controllers/brand";

const useBrand = (name, productsCategories, productsPrice, onlyAvailableProducts, onlyAmazingProducts, productsSort, productsLength) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["brands", { name, "products-categories": productsCategories, "products-price": productsPrice, "only-available-products": onlyAvailableProducts, "only-amazing-products": onlyAmazingProducts, "products-sort": productsSort }],
    queryFn: ({ pageParam }) => get(name, productsCategories, productsPrice, onlyAvailableProducts, onlyAmazingProducts, productsSort, pageParam, productsLength),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextProductsPage,
    select: ({ pages }) => ({ ...pages[pages.length - 1].data, products: pages.flatMap(({ data }) => data.products), totalProducts: pages[pages.length - 1].data.totalProducts }),
  });

  return { isFetchingBrand: isFetching, isBrandError: isError, brand: data, hasBrandNextPage: hasNextPage, fetchBrandNextPage: fetchNextPage };
};

export default useBrand;