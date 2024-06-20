import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { confirm } from "../../axios/controllers/comment";

const useConfirmComment = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => confirm(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["comments"] });

      openToast("success", null, "دیدگاه مورد نظر با موفقیت تایید شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "دیدگاه مورد نظر پیدا نشد." : response.status === 409 ? "این دیدگاه از قبل تایید شده است." : null),
  });

  return { isPendingConfirmComment: isPending, confirmComment: mutate };
};

export default useConfirmComment;