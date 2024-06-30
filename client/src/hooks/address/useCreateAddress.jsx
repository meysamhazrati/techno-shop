import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { create } from "../../axios/controllers/address";
import validator from "../../validators/address";

const useCreateAddress = () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => create(body),
    onMutate: async (body) => await validator.validate(body),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["me"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingCreateAddress: isPending, createAddress: mutate };
};

export default useCreateAddress;