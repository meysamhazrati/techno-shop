import { Outlet } from "react-router-dom";
import ToastProvider from "./contexts/Toast";

const App = () => {
  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  );
};

export default App;