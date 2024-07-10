import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { create } from "../../axios/controllers/offer";
import validator from "../../validators/offer";

const useCreateOffer = () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => create(body),
    onMutate: async (body) => await validator.create.validate(body),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["offers"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingCreateOffer: isPending, createOffer: mutate };
};

export default useCreateOffer;