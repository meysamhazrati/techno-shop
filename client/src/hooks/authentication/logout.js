import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { logout } from "../../axios/controllers/authentication";

export default () => {
  const client = useQueryClient();
  const navigate = useNavigate();

  const { openToast } = useContext(ToastContext);

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });
      openToast("success", null, "با موفقیت از حساب کاربری خود خارج شدید.");
      navigate("/");
    },
    onError: () => openToast("error"),
  });

  return { logout: mutate };
};