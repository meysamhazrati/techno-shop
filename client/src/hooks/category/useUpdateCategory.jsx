import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { update } from "../../axios/controllers/category";

const useUpdateCategory = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ title, englishTitle, logo }) => update(id, { title, englishTitle, logo }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });

      openToast("success", null, "دسته‌بندی‌ مورد نظر با موفقیت ویرایش شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "دسته‌بندی‌ مورد نظر پیدا نشد." : null),
  });

  return { isPendingUpdateCategory: isPending, updateCategory: mutate };
};

export default useUpdateCategory;