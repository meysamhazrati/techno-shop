import { forwardRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(({ onClose, children }, ref) => {
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      ref.current.style.visibility = "visible";
      ref.current.style.opacity = "100%";
    });

    const onKeyUp = ({ key }) => key === "Escape" && onClose();

    document.body.classList.add("overflow-hidden");

    window.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [ref, onClose]);

  return createPortal(
    <div ref={ref} className="invisible fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/50 px-4 opacity-0 transition-all duration-300 lg:px-8" onClick={({ target }) => target === ref.current && onClose()}>
      <div className="rounded-3xl bg-white p-6">{children}</div>
    </div>,
    document.getElementById("modal")
  );
});

Modal.displayName = "Modal";

export default Modal;