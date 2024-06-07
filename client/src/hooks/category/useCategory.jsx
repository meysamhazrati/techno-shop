import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "../../axios/controllers/category";

const useCategory = (title, productsBrands, productsPrice, onlyAvailableProducts, onlyAmazingProducts, productsSort, productsLength) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["categories", { title, "products-brands": productsBrands, "products-price": productsPrice, "only-available-products": onlyAvailableProducts, "only-amazing-products": onlyAmazingProducts, "products-sort": productsSort }],
    queryFn: ({ pageParam }) => get(title, productsBrands, productsPrice, onlyAvailableProducts, onlyAmazingProducts, productsSort, pageParam, productsLength),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextProductsPage,
    select: ({ pages }) => ({ ...pages[pages.length - 1].data, products: pages.flatMap(({ data }) => data.products), totalProducts: pages[pages.length - 1].data.totalProducts }),
  });

  return { isFetchingCategory: isFetching, isCategoryError: isError, category: data, hasCategoryNextPage: hasNextPage, fetchCategoryNextPage: fetchNextPage };
};

export default useCategory;