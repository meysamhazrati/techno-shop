import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { cancel } from "../../axios/controllers/order";

const useCancelOrder = (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => cancel(id),
    onSuccess: () => openToast("success", null, "سفارش مورد نظر با موفقیت لغو شد."),
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "سفارش مورد نظر پیدا نشد" : response.status === 409 ? "این سفارش از قبل تحویل، لغو یا مرجوع شده است." : null),
  });

  return { isPendingCancelOrder: isPending, cancelOrder: mutate };
};

export default useCancelOrder;