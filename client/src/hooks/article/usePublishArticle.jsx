import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { publish } from "../../axios/controllers/article";

const usePublishArticle = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => publish(id),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["articles"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingPublishArticle: isPending, publishArticle: mutate };
};

export default usePublishArticle;