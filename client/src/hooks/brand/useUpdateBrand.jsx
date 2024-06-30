import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { update } from "../../axios/controllers/brand";
import validator from "../../validators/brand";

const useUpdateBrand = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => update(id, body),
    onMutate: async (body) => await validator.update.validate(body),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["brands"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingUpdateBrand: isPending, updateBrand: mutate };
};

export default useUpdateBrand;