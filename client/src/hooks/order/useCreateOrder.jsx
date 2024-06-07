import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { create } from "../../axios/controllers/order";

const useCreateOrder = () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ totalPrice, products, destination, discountCode }) => create({ totalPrice, products, destination, discountCode }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });

      openToast("success", null, "سفارش شما با موفقیت ثبت شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : null),
  });

  return { isPendingCreateOrder: isPending, createOrder: mutate };
};

export default useCreateOrder;