import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { update } from "../../axios/controllers/comment";
import validator from "../../validators/comment";

const useUpdateComment = (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => update(id, body),
    onMutate: async (body) => await validator.update.validate(body),
    onSuccess: ({ message }) => openToast("success", null, message),
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingUpdateComment: isPending, updateComment: mutate };
};

export default useUpdateComment;