import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  const [shouldRender, setShouldRender] = useState(false);

  const modal = useRef();

  useEffect(() => {
    let animationFrame = null;
    let removeTimeout = null;

    const onKeyUp = ({ key }) => key === "Escape" && onClose();

    window.addEventListener("keyup", onKeyUp);

    if (isOpen) {
      setShouldRender(true);

      if (modal.current) {
        animationFrame = requestAnimationFrame(() => {
          modal.current.style.visibility = "visible";
          modal.current.style.opacity = "100%";
        });
      }

      document.body.classList.add("overflow-hidden");
    } else if (!isOpen && shouldRender) {
      modal.current.style.visibility = "hidden";
      modal.current.style.opacity = "0%";

      document.body.classList.remove("overflow-hidden");

      removeTimeout = setTimeout(() => setShouldRender(false), getComputedStyle(modal.current).getPropertyValue("transition-duration").slice(0, -1) * 1000);
    }

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      cancelAnimationFrame(animationFrame);
      clearTimeout(removeTimeout);
    };
  }, [isOpen, shouldRender, onClose]);

  return shouldRender && createPortal(
    <div ref={modal} className="invisible fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/50 p-4 opacity-0 transition-all duration-300 lg:p-8" onClick={({ target }) => target === modal.current && onClose()}>
      <div className="max-h-full max-w-full overflow-auto rounded-3xl bg-white p-6">{children}</div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;