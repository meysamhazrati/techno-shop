import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { emptyCart } from "../../axios/controllers/user";

const useEmptyCart = () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: emptyCart,
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["me"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingEmptyCart: isPending, emptyCart: mutate };
};

export default useEmptyCart;