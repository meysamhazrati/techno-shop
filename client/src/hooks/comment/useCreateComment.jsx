import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { create } from "../../axios/controllers/comment";

const useCreateComment = () => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ body, score, product, article }) => create({ body, score, product, article }),
    onSuccess: () => openToast("success", null, "دیدگاه شما با موفقیت ثبت شد."),
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : null),
  });

  return { isPendingCreateComment: isPending, createComment: mutate };
};

export default useCreateComment;