import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { return_ } from "../../axios/controllers/order";

const useReturnOrder = (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => return_(id),
    onSuccess: () => openToast("success", null, "سفارش مورد نظر با موفقیت مرجوع شد."),
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "سفارش مورد نظر پیدا نشد" : response.status === 409 ? "این سفارش جاری است یا از قبل لغو یا مرجوع شده است." : null),
  });

  return { isPendingReturnOrder: isPending, returnOrder: mutate };
};

export default useReturnOrder;