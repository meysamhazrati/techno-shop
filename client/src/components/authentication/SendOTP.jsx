import { useContext } from "react";
import { ToastContext } from "../../contexts/Toast";
import useSendOTP from "../../hooks/authentication/sendOTP";
import Loader from "../Loader";

const SendOTP = ({ email, setEmail, type, setSentAt, setCurrentComponent }) => {
  const { openToast } = useContext(ToastContext);

  const { isPendingSendOTP, sendOTP } = useSendOTP(type);

  const submit = (event) => {
    event.preventDefault();

    if (email.trim().length >= 10 && email.trim().length <= 100 && /^\w+([.-]?\w)*@\w+([.-]?\w)*\.[a-zA-Z]{2,4}$/.test(email.trim())) {
      sendOTP({ email: email.trim() }, { onSuccess: () => {
        setSentAt(Date.now());
        setCurrentComponent("verify-otp");
      } });
    } else {
      openToast("error", null, "ایمیل وارد شده نامعتبر است.");
    }
  };

  return (
    <form className="mt-6 flex flex-col gap-y-4 [&>*]:h-14" onSubmit={submit}>
      <input
        type="text"
        inputMode="email"
        value={email}
        placeholder="ایمیل"
        className="rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
        onInput={({ target }) => setEmail(target.value)}
      />
      <button type="submit" disabled={isPendingSendOTP} className="flex w-full items-center justify-center rounded-full bg-primary-900 font-vazirmatn-medium text-lg text-white transition-colors enabled:hover:bg-primary-800">
        {isPendingSendOTP ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ارسال"}
      </button>
    </form>
  );
};

export default SendOTP;