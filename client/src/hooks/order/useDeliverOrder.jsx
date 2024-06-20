import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { deliver } from "../../axios/controllers/order";

const useDeliverOrder = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => deliver(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["orders"] });

      openToast("success", null, "سفارش مورد نظر با موفقیت تحویل شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "سفارش مورد نظر پیدا نشد" : response.status === 409 ? "این سفارش از قبل تحویل، لغو یا مرجوع شده است." : null),
  });

  return { isPendingDeliverOrder: isPending, deliverOrder: mutate };
};

export default useDeliverOrder;