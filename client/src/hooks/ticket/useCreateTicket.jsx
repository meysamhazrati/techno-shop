import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { create } from "../../axios/controllers/ticket";

const useCreateTicket = () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ department, title, body }) => create({ department, title, body }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });

      openToast("success", null, "تیکت شما با موفقیت ثبت شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : null),
  });

  return { isPendingCreateTicket: isPending, createTicket: mutate };
};

export default useCreateTicket;