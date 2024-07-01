import { useState, useEffect } from "react";
import useSendOTP from "../../hooks/otp/useSendOTP";
import useVerifyOTP from "../../hooks/otp/useVerifyOTP";
import Timer from "../Timer";
import Loader from "../Loader";
import ChevronIcon from "../../icons/ChevronIcon";

const VerifyOTP = ({ email, type, sentAt, setSentAt, setCurrentComponent }) => {
  const [code, setCode] = useState("");
  const [canSendOTPAgain, setCanSendOTPAgain] = useState(false);

  const { isPendingSendOTP, sendOTP } = useSendOTP(type);
  const { isPendingVerifyOTP, verifyOTP } = useVerifyOTP();

  useEffect(() => {
    const timer = setInterval(() => !canSendOTPAgain ? setCanSendOTPAgain(Date.now() >= sentAt + 1000 * 60 * 2) : clearInterval(timer), 1000);

    return () => clearInterval(timer);
  }, [canSendOTPAgain, sentAt]);

  return (
    <>
      <div className="text-center">
        <div className="relative flex items-center justify-center">
          <h2 className="font-vazirmatn-bold text-2xl">کد تایید</h2>
          <button className="absolute left-0 flex size-10 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={() => setCurrentComponent("send-otp")}>
            <ChevronIcon className="size-6 rotate-180" />
          </button>
        </div>
        <span className="mt-3 block text-lg text-zinc-500">کد تایید به {email} ارسال شد.</span>
      </div>
      <form className="mt-6 flex flex-col gap-y-4 [&>*]:h-14" onSubmit={(event) => {
        event.preventDefault();

        verifyOTP({ email: email.trim(), code: code.trim() }, { onSuccess: () => setCurrentComponent(type), onError: ({ status }) => status === 429 && setCurrentComponent("send-otp") });
      }}>
        <input
          type="text"
          inputMode="number"
          value={code}
          placeholder="کد تایید"
          className="rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
          onInput={({ target }) => !isNaN(target.value.trim()) && target.value.trim().length <= 7 && setCode(target.value)}
        />
        <button type="submit" disabled={isPendingVerifyOTP} className="flex w-full items-center justify-center rounded-full bg-primary-900 font-vazirmatn-medium text-lg text-white transition-colors enabled:hover:bg-primary-800">
          {isPendingVerifyOTP ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "تایید"}
        </button>
      </form>
      <button
        disabled={!canSendOTPAgain || isPendingSendOTP}
        className="mx-auto mt-6 block text-zinc-500 transition-colors enabled:hover:text-primary-900"
        onClick={() => sendOTP({ email: email.trim() }, { onSuccess: () => {
          setSentAt(Date.now());
          setCanSendOTPAgain(false);
        }, onError: ({ status }) => status === 403 && setCurrentComponent("send-otp") })}
      >
        {isPendingSendOTP ? "در حال ارسال" : "ارسال دوباره "}
        {!canSendOTPAgain && (
          <>
            ( <Timer day={false} hour={false} expiresAt={new Date(sentAt + 1000 * 60 * 2)} /> )
          </>
        )}
      </button>
    </>
  );
};

export default VerifyOTP;