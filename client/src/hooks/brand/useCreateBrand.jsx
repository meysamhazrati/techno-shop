import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { create } from "../../axios/controllers/brand";
import validator from "../../validators/brand";

const useCreateBrand = () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => create(body),
    onMutate: async (body) => await validator.create.validate(body),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["brands"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingCreateBrand: isPending, createBrand: mutate };
};

export default useCreateBrand;