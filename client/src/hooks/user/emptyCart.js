import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { emptyCart } from "../../axios/controllers/user";

const shouldRetry = ({ response }) => response.status !== 409;

export default () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: emptyCart,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => client.invalidateQueries({ queryKey: ["me"] }),
    onError: ({ response }) => openToast("error", null, response.status === 409 ? "سبد خرید شما در حال حاضر خالی است." : null),
  });

  return { isPendingEmptyCart: isPending, emptyCart: mutate };
};