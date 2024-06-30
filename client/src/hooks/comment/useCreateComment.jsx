import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { create } from "../../axios/controllers/comment";
import validator from "../../validators/comment";

const useCreateComment = () => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => create(body),
    onMutate: async (body) => await validator.create.validate(body),
    onSuccess: ({ message }) => openToast("success", null, message),
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingCreateComment: isPending, createComment: mutate };
};

export default useCreateComment;