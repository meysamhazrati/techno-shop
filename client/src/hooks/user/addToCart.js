import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Context as ToastContext } from "../../contexts/Toast";
import { addToCart } from "../../axios/controllers/user";

const shouldRetry = (error) => !/404|409/.test(error.response.status);

export default (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (data) => addToCart(id, data),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => client.invalidateQueries(["me"]),
    onError: () => openToast("error", "خطا!", "مشکلی پیش آمد! لطفا بعدا دوباره تلاش کنید."),
  });

  return { isPendingAddToCart: isPending, addToCart: mutate };
};