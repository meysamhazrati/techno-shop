import useSendOTP from "../../hooks/otp/useSendOTP";
import Loader from "../Loader";

const SendOTP = ({ email, setEmail, type, setSentAt, setCurrentComponent }) => {
  const { isPendingSendOTP, sendOTP } = useSendOTP(type);

  return (
    <form className="mt-6 flex flex-col gap-y-4 [&>*]:h-14" onSubmit={(event) => {
      event.preventDefault();

      sendOTP({ email }, { onSuccess: () => {
        setSentAt(Date.now());
        setCurrentComponent("verify-otp");
      } });
    }}>
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