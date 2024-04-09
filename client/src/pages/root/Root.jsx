import { Outlet } from "react-router-dom";
import Header from "../../components/root/Header";
import MobileNavigation from "../../components/MobileNavigation";
import Footer from "../../components/root/Footer";

const Root = () => {
  return (
    <>
      <Header />
      <main className="container flex min-h-svh flex-col justify-center pb-[72px] pt-24 xs:pb-[88px] lg:min-h-max lg:pb-12 lg:pt-44">
        <Outlet />
      </main>
      <MobileNavigation />
      <Footer />
    </>
  );
};

export default Root;