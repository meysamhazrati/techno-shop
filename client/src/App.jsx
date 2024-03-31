import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import ToastProvider from "./contexts/Toast";

const App = () => {
  const location = useLocation();

  useEffect(() => window.scrollTo(0, 0), [location]);

  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  );
};

export default App;