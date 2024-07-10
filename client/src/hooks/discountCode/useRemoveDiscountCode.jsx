import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { remove } from "../../axios/controllers/discountCode";

const useRemoveDiscountCode = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => remove(id),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["discount-codes"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingRemoveDiscountCode: isPending, removeDiscountCode: mutate };
};

export default useRemoveDiscountCode;