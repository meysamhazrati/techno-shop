import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { remove } from "../../axios/controllers/favorite";

const shouldRetry = ({ response }) => response.status !== 404;

export default (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => remove(id),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });
      openToast("success", null, "علاقه‌مندی مورد نظر با موفقیت حذف شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 404 ? "علاقه‌مندی مورد نظر پیدا نشد." : null),
  });

  return { isPendingRemoveFavorite: isPending, removeFavorite: mutate };
};