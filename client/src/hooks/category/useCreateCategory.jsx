import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { create } from "../../axios/controllers/category";

const useCreateCategory = () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ title, englishTitle, logo }) => create({ title, englishTitle, logo }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["categories"] });
      
      openToast("success", null, "دسته‌بندی‌ مورد نظر با موفقیت ثبت شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : null),
  });

  return { isPendingCreateCategory: isPending, createCategory: mutate };
};

export default useCreateCategory;