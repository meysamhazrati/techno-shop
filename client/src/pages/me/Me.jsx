import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import useMe from "../../hooks/authentication/me";
import SideBar from "../../components/me/SideBar";
import Header from "../../components/me/Header";
import MobileNavigation from "../../components/MobileNavigation";

const Me = () => {
  const navigate = useNavigate();

  const { isPendingMe, isMeError } = useMe();

  useEffect(() => {
    isMeError && navigate("/");
  }, [isMeError, navigate]);

  return !isPendingMe && !isMeError && (
    <>
      <main className="container relative flex min-h-svh flex-col items-start gap-4 pb-[72px] pt-4 xs:gap-8 xs:pb-[104px] xs:pt-8 lg:flex-row lg:pb-8">
        <SideBar />
        <section className="flex w-full flex-col gap-4 xs:gap-y-8">
          <Header />
          <section className="w-full overflow-hidden rounded-3xl bg-white p-6 lg:w-[640px] xl:w-[864px]">
            <Outlet />
          </section>
        </section>
      </main>
      <MobileNavigation />
    </>
  );
};

export default Me;