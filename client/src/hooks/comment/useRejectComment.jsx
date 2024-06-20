import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { reject } from "../../axios/controllers/comment";

const useRejectComment = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => reject(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["comments"] });

      openToast("success", null, "دیدگاه مورد نظر با موفقیت رد شد.")
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "دیدگاه مورد نظر پیدا نشد." : response.status === 409 ? "این دیدگاه از قبل رد شده است." : null),
  });

  return { isPendingRejectComment: isPending, rejectComment: mutate };
};

export default useRejectComment;