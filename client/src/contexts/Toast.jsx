import { createContext, useState } from "react";
import Toast from "../components/Toast";

const Context = createContext();

const Provider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const open = (status, title, description) => {
    setIsOpen(true);
    setStatus(status);
    setTitle(title);
    setDescription(description);
  };

  const close = () => {
    setIsOpen(false);
    setStatus(null);
    setTitle("");
    setDescription("");
  };

  return (
    <Context.Provider value={{ openToast: open }}>
      {children}
      {isOpen && <Toast status={status} title={title} description={description} onClose={close} />}
    </Context.Provider>
  );
};

export { Context as ToastContext };
export default Provider;