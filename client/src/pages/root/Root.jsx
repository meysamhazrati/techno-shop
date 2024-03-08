import { Outlet } from "react-router-dom";
import Header from "../../components/root/Header";

const Root = () => {
  return (
    <>
      <Header />
      <div className="container pt-20 lg:pt-32">
        <Outlet />
      </div>
    </>
  );
};

export default Root;