import { Outlet } from "react-router-dom";
import Header from "../../components/root/Header";
import Footer from "../../components/root/Footer";

const Root = () => {
  return (
    <>
      <Header />
      <div className="container pt-20 lg:pt-32">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Root;