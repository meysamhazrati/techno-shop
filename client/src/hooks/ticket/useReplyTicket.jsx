import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { reply } from "../../axios/controllers/ticket";
import validator from "../../validators/ticket";

const useReplyTicket = (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => reply(id, body),
    onMutate: async (body) => await validator.reply.validate(body),
    onSuccess: ({ message }) => openToast("success", null, message),
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingReplyTicket: isPending, replyTicket: mutate };
};

export default useReplyTicket;