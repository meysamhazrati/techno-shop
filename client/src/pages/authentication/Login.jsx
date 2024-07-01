import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/authentication/useLogin";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isPendingLogin, login } = useLogin();

  useEffect(() => {
    document.title = "تکنوشاپ - ورود";
  }, []);

  return (
    <>
      <div className="text-center">
        <h2 className="font-vazirmatn-bold text-2xl">ورود</h2>
        <span className="mt-3 block text-lg text-zinc-500">حساب کاربری ندارید؟ <Link to="/authentication/register" className="text-primary-900">ثبت نام کنید</Link></span>
      </div>
      <form className="mt-6 flex flex-col gap-y-4 [&>*]:h-14" onSubmit={(event) => {
        event.preventDefault();

        login({ email: email.trim(), password: password.trim() });
      }}>
        <input
          type="text"
          inputMode="email"
          value={email}
          placeholder="ایمیل"
          className="rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
          onInput={({ target }) => setEmail(target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="رمز عبور"
          className="rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
          onInput={({ target }) => setPassword(target.value)}
        />
        <button type="submit" disabled={isPendingLogin} className="flex w-full items-center justify-center rounded-full bg-primary-900 font-vazirmatn-medium text-lg text-white transition-colors enabled:hover:bg-primary-800">
          {isPendingLogin ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ورود"}
        </button>
      </form>
      <Link to="/authentication/reset-password" className="mt-6 block text-center text-zinc-500 transition-colors hover:text-primary-900">رمز عبور خود را فراموش کردید؟</Link>
    </>
  );
};

export default Login;