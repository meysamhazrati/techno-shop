import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { confirm } from "../../axios/controllers/comment";

const useConfirmComment = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => confirm(id),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["comments"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingConfirmComment: isPending, confirmComment: mutate };
};

export default useConfirmComment;