import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useRegister from "../../hooks/authentication/useRegister";
import SendOTP from "../../components/authentication/SendOTP";
import VerifyOTP from "../../components/authentication/VerifyOTP";
import Loader from "../../components/Loader";
import ChevronIcon from "../../icons/ChevronIcon";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sentAt, setSentAt] = useState(null);
  const [currentComponent, setCurrentComponent] = useState(null);

  const { isPendingRegister, register } = useRegister();

  useEffect(() => {
    document.title = "تکنوشاپ - ثبت نام";

    setCurrentComponent("send-otp");
  }, []);

  return (
    <>
      <div className="text-center">
        {currentComponent === "send-otp" && (
          <>
            <h2 className="font-vazirmatn-bold text-2xl">ثبت نام</h2>
            <span className="mt-3 block text-lg text-zinc-500">قبلا ثبت نام کرده‌اید؟ <Link to="/authentication/login" className="text-primary-900">وارد شوید</Link></span>
          </>
        )}
        {currentComponent === "register" && (
          <>
            <div className="relative flex items-center justify-center">
              <h2 className="font-vazirmatn-bold text-2xl">اطلاعات کاربری</h2>
              <button className="absolute left-0 flex size-9 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={() => setCurrentComponent("send-otp")}>
                <ChevronIcon className="size-6 rotate-180" />
              </button>
            </div>
            <span className="mt-3 block text-lg text-zinc-500">اطلاعات حساب کاربری خود را وارد کنید.</span>
          </>
        )}
      </div>
      {currentComponent === "send-otp" ? (
        <SendOTP email={email} setEmail={setEmail} type="register" setSentAt={setSentAt} setCurrentComponent={setCurrentComponent} />
      ) : currentComponent === "verify-otp" ? (
        <VerifyOTP email={email} type="register" sentAt={sentAt} setSentAt={setSentAt} setCurrentComponent={setCurrentComponent} />
      ) : (
        <form className="mt-6 flex flex-col gap-y-4 [&>*]:h-14" onSubmit={(event) => {
          event.preventDefault();

          register({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), password: password.trim() });
        }}>
          <input
            type="text"
            value={firstName}
            placeholder="نام"
            className="rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setFirstName(target.value)}
          />
          <input
            type="text"
            value={lastName}
            placeholder="نام خانوادگی"
            className="rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setLastName(target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="رمز عبور"
            className="rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setPassword(target.value)}
          />
          <button type="submit" disabled={isPendingRegister} className="flex w-full items-center justify-center rounded-full bg-primary-900 font-vazirmatn-medium text-lg text-white transition-colors enabled:hover:bg-primary-800">
            {isPendingRegister ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ثبت نام"}
          </button>
        </form>
      )}
    </>
  );
};

export default Register;