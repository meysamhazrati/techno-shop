import { useQuery } from "@tanstack/react-query";
import { get } from "../../axios/controllers/order";

const useOrder = (id) => {
  const { isFetching, isError, data } = useQuery({
    queryKey: ["orders", { id }],
    queryFn: () => get(id),
    select: ({ data }) => data,
  });

  return { isFetchingOrder: isFetching, isOrderError: isError, order: data };
};

export default useOrder;