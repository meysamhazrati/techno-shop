import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { removeFromCart } from "../../axios/controllers/user";

const useRemoveFromCart = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ color }) => removeFromCart(id, { color }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });
      
      openToast("success", null, "محصول مورد نظر با موفقیت از سبد خرید شما حذف شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "محصول مورد نظر پیدا نشد." : response.status === 409 ? "محصول مورد نظر در سبد خرید شما نمی‌باشد." : null),
  });

  return { isPendingRemoveFromCart: isPending, removeFromCart: mutate };
};

export default useRemoveFromCart;