import { useQueryClient, useMutation } from "@tanstack/react-query";
import { removeFromCart } from "../../axios/controllers/user";

const shouldRetry = (error) => !/404|409/.test(error.response.status);

export default (id) => {
  const client = useQueryClient();

  const { isPending, isError, mutate } = useMutation({
    mutationKey: ["users", id],
    mutationFn: (data) => removeFromCart(id, data),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => client.invalidateQueries(["me"]),
  });

  return { isPending, isError, mutate };
};