import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "../../axios/controllers/product";

const useProduct = (id, commentsLength) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products", { id }],
    queryFn: ({ pageParam }) => get(id, pageParam, commentsLength),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextCommentsPage,
    select: ({ pages }) => ({ ...pages[pages.length - 1].data, comments: pages.flatMap(({ data }) => data.comments), totalComments: pages[pages.length - 1].data.totalComments }),
  });

  return { isFetchingProduct: isFetching, isProductError: isError, product: data, hasProductNextPage: hasNextPage, fetchProductNextPage: fetchNextPage };
};

export default useProduct;