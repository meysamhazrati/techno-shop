import { createContext, useState } from "react";
import Success from "../toasts/Success";
import Error from "../toasts/Error";

const Context = createContext();

const Provider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const openToast = (status, title, description) => {
    setIsOpen(true);
    setStatus(status);
    setTitle(title);
    setDescription(description);
  };

  const closeToast = () => {
    setIsOpen(false);
    setStatus(null);
    setTitle("");
    setDescription("");
  };

  return (
    <Context.Provider value={{ openToast, closeToast }}>
      {children}
      {isOpen && <>{status === "success" ? <Success title={title} description={description} /> : <Error title={title} description={description} />}</>}
    </Context.Provider>
  );
};

export { Context };
export default Provider;