import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { Context as ToastContext } from "../../contexts/Toast";
import { remove } from "../../axios/controllers/comment";

const shouldRetry = ({ response }) => !/403|404/.test(response.status);

export default (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => remove(id),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => openToast("success", null, "دیدگاه مورد نظر با موفقیت حذف شد."),
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم برای حذف این دیدگاه را ندارید." : response.status === 404 ? "دیدگاه مورد نظر پیدا نشد." : null),
  });

  return { isPendingRemoveComment: isPending, removeComment: mutate };
};