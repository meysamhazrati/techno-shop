import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { ban } from "../../axios/controllers/user";

const useBanUser = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => ban(id),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["users"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingBanUser: isPending, banUser: mutate };
};

export default useBanUser;