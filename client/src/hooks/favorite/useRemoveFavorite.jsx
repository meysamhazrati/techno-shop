import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { remove } from "../../axios/controllers/favorite";

const useRemoveFavorite = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => remove(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });
      
      openToast("success", null, "علاقه‌مندی مورد نظر با موفقیت حذف شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "علاقه‌مندی مورد نظر پیدا نشد." : null),
  });

  return { isPendingRemoveFavorite: isPending, removeFavorite: mutate };
};

export default useRemoveFavorite;