import { useState, useContext, useEffect } from "react";
import { ToastContext } from "../../contexts/Toast";
import useResetPassword from "../../hooks/authentication/useResetPassword";
import SendOTP from "../../components/authentication/SendOTP";
import VerifyOTP from "../../components/authentication/VerifyOTP";
import Loader from "../../components/Loader";
import ChevronIcon from "../../icons/Chevron";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sentAt, setSentAt] = useState(null);
  const [currentComponent, setCurrentComponent] = useState(null);

  const { openToast } = useContext(ToastContext);

  const { isPendingResetPassword, resetPassword } = useResetPassword();

  const submit = (event) => {
    event.preventDefault();

    if (/^[\w?!$._-]{8,20}$/.test(password.trim())) {
      resetPassword({ email: email.trim(), password: password.trim() });
    } else {
      openToast("error", null, "رمز عبور باید بین 8 تا 20 کاراکتر باشد.");
    }
  };

  useEffect(() => {
    document.title = "تکنوشاپ - بازنشانی رمز عبور";

    setCurrentComponent("send-otp");
  }, []);

  return (
    <>
      <div className="text-center">
        {currentComponent === "send-otp" && (
          <>
            <h2 className="font-vazirmatn-bold text-2xl">بازنشانی رمز عبور</h2>
            <span className="mt-3 block text-lg text-zinc-500">ایمیل خود را وارد کنید.</span>
          </>
        )}
        {currentComponent === "reset-password" && (
          <>
            <div className="relative flex items-center justify-center">
              <h2 className="font-vazirmatn-bold text-2xl">رمز عبور جدید</h2>
              <button className="absolute left-0 flex size-9 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={() => setCurrentComponent("send-otp")}>
                <ChevronIcon className="size-6 rotate-180" />
              </button>
            </div>
            <span className="mt-3 block text-lg text-zinc-500">رمز عبور جدید خود را وارد کنید.</span>
          </>
        )}
      </div>
      {currentComponent === "send-otp" ? (
        <SendOTP email={email} setEmail={setEmail} type="reset-password" setSentAt={setSentAt} setCurrentComponent={setCurrentComponent} />
      ) : currentComponent === "verify-otp" ? (
        <VerifyOTP email={email} type="reset-password" sentAt={sentAt} setSentAt={setSentAt} setCurrentComponent={setCurrentComponent} />
      ) : (
        <form className="mt-6 flex flex-col gap-y-4 [&>*]:h-14" onSubmit={submit}>
          <input
            type="password"
            value={password}
            placeholder="رمز عبور"
            className="rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setPassword(target.value)}
          />
          <button type="submit" disabled={isPendingResetPassword} className="flex w-full items-center justify-center rounded-full bg-primary-900 font-vazirmatn-medium text-lg text-white transition-colors enabled:hover:bg-primary-800">
            {isPendingResetPassword ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "بازنشانی"}
          </button>
        </form>
      )}
    </>
  );
};

export default ResetPassword;