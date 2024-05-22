import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { emptyFavorites } from "../../axios/controllers/user";

const shouldRetry = ({ response }) => response.status !== 409;

export default () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: emptyFavorites,
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });
      openToast("success", null, "علاقه‌مندی های شما با موفقیت خالی شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 409 ? "علاقه‌مندی های شما در حال حاضر خالی است." : null),
  });

  return { isPendingEmptyFavorites: isPending, emptyFavorites: mutate };
};