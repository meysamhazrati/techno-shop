import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Toast = ({ status, title, description, onClose }) => {
  const toast = useRef();
  const toastTimer = useRef();

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      toast.current.style.opacity = "100%";
      toast.current.style[window.innerWidth > 480 ? "right" : "top"] = window.innerWidth < 1024 ? "16px" : "32px";
    });

    const timer = setInterval(() => toastTimer.current.style.width = `${(toastTimer.current.style.width.slice(0, -1) || 100) - 1}%`, 4000 / 100);

    const animationTimeout = setTimeout(() => {
      toast.current.style.opacity = "0%";
      toast.current.style[window.innerWidth > 480 ? "right" : "top"] = "0px";
    }, 4000);

    const closeTimeout = setTimeout(onClose, 4000 + getComputedStyle(toast.current) .getPropertyValue("transition-duration") .slice(0, -1) * 1000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(timer);
      clearTimeout(animationTimeout);
      clearTimeout(closeTimeout);
    };
  }, [onClose]);

  return createPortal(
    <div ref={toast} className="fixed left-4 right-4 top-0 z-[60] max-w-full overflow-hidden rounded-2xl bg-white p-6 opacity-0 shadow transition-all duration-300 xs:right-0 xs:top-4 xs:max-w-max lg:left-8 lg:top-8">
      <div className="flex size-full items-center gap-x-3">
        <div className={`flex size-14 shrink-0 items-center justify-center rounded-full ${status === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" className="size-9">
            {status === "success" ? <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />}
          </svg>
        </div>
        <div>
          <h4 className="font-vazirmatn-bold text-2xl">{title || (status === "success" ? "موفق!" : "خطا!")}</h4>
          <p className="text-lg text-zinc-400">{description || (status === "success" ? "عملیات مورد نظر با موفقیت انجام شد." : "مشکلی پیش آمد! لطفا بعدا دوباره تلاش کنید.")}</p>
        </div>
      </div>
      <div ref={toastTimer} className={`absolute bottom-0 left-0 right-0 mx-auto h-1.5 w-full rounded ${status === "success" ? "bg-green-500" : "bg-red-500"}`}></div>
    </div>,
    document.getElementById("toast")
  );
};

export default Toast;