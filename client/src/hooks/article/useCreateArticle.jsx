import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { create } from "../../axios/controllers/article";
import validator from "../../validators/article";

const useCreateArticle = () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => create(body),
    onMutate: async (body) => await validator.create.validate(body),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["articles"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingCreateArticle: isPending, createArticle: mutate };
};

export default useCreateArticle;