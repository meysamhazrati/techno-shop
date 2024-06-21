import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { create } from "../../axios/controllers/brand";

const useCreateBrand = () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ name, englishName, logo }) => create({ name, englishName, logo }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["brands"] });
      
      openToast("success", null, "برند مورد نظر با موفقیت ثبت شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : null),
  });

  return { isPendingCreateBrand: isPending, createBrand: mutate };
};

export default useCreateBrand;