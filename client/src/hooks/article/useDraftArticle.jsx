import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { draft } from "../../axios/controllers/article";

const useDraftArticle = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => draft(id),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["articles"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingDraftArticle: isPending, draftArticle: mutate };
};

export default useDraftArticle;