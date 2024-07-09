import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { remove } from "../../axios/controllers/article";

const useRemoveArticle = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => remove(id),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["articles"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingRemoveArticle: isPending, removeArticle: mutate };
};

export default useRemoveArticle;