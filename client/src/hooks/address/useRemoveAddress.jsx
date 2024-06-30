import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { remove } from "../../axios/controllers/address";

const useRemoveAddress = (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => remove(id),
    onSuccess: ({ message }) => openToast("success", null, message),
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingRemoveAddress: isPending, removeAddress: mutate };
};

export default useRemoveAddress;