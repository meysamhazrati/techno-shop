import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { reject } from "../../axios/controllers/comment";

const useRejectComment = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => reject(id),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["comments"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingRejectComment: isPending, rejectComment: mutate };
};

export default useRejectComment;