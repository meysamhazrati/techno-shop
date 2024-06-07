import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { logout } from "../../axios/controllers/authentication";

const useLogout = () => {
  const client = useQueryClient();
  
  const navigate = useNavigate();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });

      navigate("/");
      
      openToast("success", null, "با موفقیت از حساب کاربری خود خارج شدید.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : null),
  });

  return { isPendingLogout: isPending, logout: mutate };
};

export default useLogout;