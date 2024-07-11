import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "../../axios/controllers/article";

const useArticle = (id, onlyConfirmedComments, commentsLength) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["articles", { id }],
    queryFn: ({ pageParam }) => get(id, onlyConfirmedComments, pageParam, commentsLength),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextCommentsPage,
    select: ({ pages }) => ({ ...pages[pages.length - 1].data, comments: pages.flatMap(({ data }) => data.comments), totalComments: pages[pages.length - 1].data.totalComments }),
  });

  return { isFetchingArticle: isFetching, isArticleError: isError, article: data, hasArticleNextPage: hasNextPage, fetchArticleNextPage: fetchNextPage };
};

export default useArticle;