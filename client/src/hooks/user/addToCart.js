import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Context as ToastContext } from "../../contexts/Toast";
import { addToCart } from "../../axios/controllers/user";

const shouldRetry = (error) => !/403|404|409/.test(error.response.status);

export default (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (data) => addToCart(id, data),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => client.invalidateQueries({ queryKey: ["me"] }),
    onError: (error) => openToast("error", null, error.response.status === 403 ? "لطفا ابتدا وارد حساب کاربری خود شوید." : null),
  });

  return { isPendingAddToCart: isPending, addToCart: mutate };
};