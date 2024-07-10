import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../../axios/controllers/discountCode";

const useDiscountCodes = (length) => {
  const { isFetching, isError, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["discount-codes"],
    queryFn: ({ pageParam }) => getAll(pageParam, length),
    initialPageParam: 1,
    getNextPageParam: ({ data }) => data.nextPage,
    select: ({ pages }) => ({ discountCodes: pages.flatMap(({ data }) => data.discountCodes), total: pages[pages.length - 1].data.total }),
  });

  return { isFetchingDiscountCodes: isFetching, isDiscountCodesError: isError, discountCodes: data?.discountCodes, total: data?.total, hasDiscountCodesNextPage: hasNextPage, fetchDiscountCodesNextPage: fetchNextPage };
};

export default useDiscountCodes;