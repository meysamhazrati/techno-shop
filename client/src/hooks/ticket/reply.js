import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { reply } from "../../axios/controllers/ticket";

const shouldRetry = ({ response }) => !/400|403|404/.test(response.status);

export default (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ body }) => reply(id, { body }),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => openToast("success", null, "پاسخ شما با موفقیت ثبت شد."),
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشد." : response.status === 403 ? "شما دسترسی لازم برای پاسخ به این تیکت را ندارید." : response.status === 404 ? "تیکت مورد نظر پیدا نشد." : null),
  });

  return { isPendingReplyTicket: isPending, replyTicket: mutate };
};