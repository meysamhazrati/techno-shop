import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Context as ToastContext } from "../../contexts/Toast";
import { addToFavorites } from "../../axios/controllers/user";

const shouldRetry = ({ response }) => !/403|404|409/.test(response.status);

export default (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => addToFavorites(id),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => client.invalidateQueries({ queryKey: ["me"] }),
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "لطفا ابتدا وارد حساب کاربری خود شوید." : null),
  });

  return { isPendingAddToFavorites: isPending, addToFavorites: mutate };
};