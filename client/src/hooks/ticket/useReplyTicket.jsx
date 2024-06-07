import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { reply } from "../../axios/controllers/ticket";

const useReplyTicket = (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ body }) => reply(id, { body }),
    onSuccess: () => openToast("success", null, "پاسخ شما با موفقیت ارسال شد."),
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "تیکت مورد نظر پیدا نشد." : null),
  });

  return { isPendingReplyTicket: isPending, replyTicket: mutate };
};

export default useReplyTicket;