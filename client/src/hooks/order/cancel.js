import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { cancel } from "../../axios/controllers/order";

const shouldRetry = ({ response }) => /403|404|409/.test(response.status);

export default (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => cancel(id),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => openToast("success", null, "سفارش مورد نظر با موفقیت لغو شد."),
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم برای لغو این سفارش را ندارید." : response.status === 404 ? "سفارش مورد نظر پیدا نشد" : response.status === 409 ? "این سفارش از قبل تحویل، لغو یا مرجوع شده است." : null),
  });

  return { isPendingCancelOrder: isPending, cancelOrder: mutate };
};