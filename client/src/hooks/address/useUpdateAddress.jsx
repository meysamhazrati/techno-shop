import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { update } from "../../axios/controllers/address";
import validator from "../../validators/address";

const useUpdateAddress = (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => update(id, body),
    onMutate: async (body) => await validator.validate(body),
    onSuccess: ({ message }) => openToast("success", null, message),
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingUpdateAddress: isPending, updateAddress: mutate };
};

export default useUpdateAddress;