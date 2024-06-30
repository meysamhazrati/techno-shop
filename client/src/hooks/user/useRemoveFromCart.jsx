import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { removeFromCart } from "../../axios/controllers/user";
import validator from "../../validators/user";

const useRemoveFromCart = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => removeFromCart(id, body),
    onMutate: async (body) => await validator.cart.validate(body),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["me"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingRemoveFromCart: isPending, removeFromCart: mutate };
};

export default useRemoveFromCart;