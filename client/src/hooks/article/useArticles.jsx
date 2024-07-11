import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/article";

const useArticles = (categories, onlyPublished, sort, length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["articles", { categories, onlyPublished, sort }],
    queryFn: ({ pageParam }) => getAll(categories, onlyPublished, sort, pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    select: ({ pages }) => ({ articles: pages.flatMap(({ data }) => data.articles), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingArticles: isFetching, isArticlesError: isError, articles: data?.articles, totalArticles: data?.total, hasArticlesNextPage: hasNextPage, fetchArticlesNextPage: fetchNextPage };
};

export default useArticles;