import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { update } from "../../axios/controllers/article";
import validator from "../../validators/article";

const useUpdateArticle = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => update(id, body),
    onMutate: async (body) => await validator.update.validate(body),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["articles"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingUpdateArticle: isPending, updateArticle: mutate };
};

export default useUpdateArticle;