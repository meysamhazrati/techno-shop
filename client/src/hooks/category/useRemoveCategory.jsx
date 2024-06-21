import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { remove } from "../../axios/controllers/category";

const useRemoveCategory = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => remove(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });

      openToast("success", null, "دسته‌بندی‌ مورد نظر با موفقیت حذف شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "دسته‌بندی‌ مورد نظر پیدا نشد." : null),
  });

  return { isPendingRemoveCategory: isPending, removeCategory: mutate };
};

export default useRemoveCategory;