import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { addToCart } from "../../axios/controllers/user";

const useAddToCart = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ color }) => addToCart(id, { color }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });
      
      openToast("success", null, "محصول مورد نظر با موفقیت به سبد خرید شما اضافه شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "محصول مورد نظر پیدا نشد." : response.status === 409 ? "موجودی محصول مورد نظر کافی نمی‌باشد." : null),
  });

  return { isPendingAddToCart: isPending, addToCart: mutate };
};

export default useAddToCart;