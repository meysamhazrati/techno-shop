import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { emptyCart } from "../../axios/controllers/user";

const useEmptyCart = () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: emptyCart,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });
      
      openToast("success", null, "سبد خرید شما با موفقیت خالی شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 409 ? "سبد خرید شما در حال حاضر خالی است." : null),
  });

  return { isPendingEmptyCart: isPending, emptyCart: mutate };
};

export default useEmptyCart;