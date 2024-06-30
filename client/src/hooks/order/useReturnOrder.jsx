import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { return_ } from "../../axios/controllers/order";

const useReturnOrder = (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => return_(id),
    onSuccess: ({ message }) => openToast("success", null, message),
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingReturnOrder: isPending, returnOrder: mutate };
};

export default useReturnOrder;