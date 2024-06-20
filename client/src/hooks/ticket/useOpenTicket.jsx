import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { open } from "../../axios/controllers/ticket";

const useOpenTicket = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => open(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tickets"] });

      openToast("success", null, "تیکت مورد نظر با موفقیت باز شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "تیکت مورد نظر پیدا نشد." : response.status === 409 ? "این تیکت از قبل باز است." : null),
  });

  return { isPendingOpenTicket: isPending, openTicket: mutate };
};

export default useOpenTicket;