import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/category";

const useCategories = (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    select: ({ pages }) => ({ categories: pages.flatMap(({ data }) => data.categories), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingCategories: isFetching, isCategoriesError: isError, categories: data?.categories, totalCategories: data?.total, hasCategoriesNextPage: hasNextPage, fetchCategoriesNextPage: fetchNextPage };
};

export default useCategories;