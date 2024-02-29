import { useState, useRef, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { Context as ToastContext } from "../contexts/Toast";

const Toast = (Component) => ({ title, description }) => {
  const [width, setWidth] = useState(100);

  const toast = useRef();

  const { closeToast } = useContext(ToastContext);

  useEffect(() => {
    const timerWidth = 100;
    const removeTime = 4000;
    const animationDuration = getComputedStyle(toast.current).getPropertyValue("transition-duration").slice(0, 3) * 1000;

    const animationFrame = requestAnimationFrame(() => {
      toast.current.style.opacity = "100%";
      toast.current.style.right = window.innerWidth < 1024 ? "8px" : "16px";
    });

    const timer = setInterval(() => setWidth((width) => width - 1), removeTime / timerWidth);

    const animationTimeout = setTimeout(() => {
      toast.current.style.opacity = "0%";
      toast.current.style.right = "0px";
    }, removeTime);

    const removeTimeout = setTimeout(() => closeToast(), removeTime + animationDuration);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(timer);
      clearTimeout(animationTimeout);
      clearTimeout(removeTimeout);
    };
  }, [closeToast]);

  return createPortal(
    <div ref={toast} className="fixed right-0 top-2 z-50 overflow-hidden rounded-2xl bg-white p-3 opacity-0 shadow-lg transition-all duration-300 lg:top-4">
      <Component title={title} description={description} width={width} />
    </div>,
    document.getElementById("toast")
  );
};

export default Toast;