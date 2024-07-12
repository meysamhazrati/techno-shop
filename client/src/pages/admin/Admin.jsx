import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import useMe from "../../hooks/authentication/useMe";
import SideBar from "../../components/admin/SideBar";
import MobileNavigation from "../../components/MobileNavigation";

const Admin = () => {
  const navigate = useNavigate();

  const { isPendingMe, isMeError, me } = useMe();

  useEffect(() => {
    !isPendingMe && (isMeError || me.role !== "ADMIN") && navigate("/me");
  }, [isPendingMe, isMeError, me, navigate]);

  return !isPendingMe && !isMeError && me.role === "ADMIN" && (
    <>
      <main className="relative flex min-h-max flex-col items-start gap-4 px-4 pb-[72px] pt-4 xs:gap-8 xs:px-8 xs:pb-[104px] xs:pt-8 lg:flex-row">
        <SideBar />
        <section className="w-full overflow-hidden rounded-3xl bg-white p-6">
          <Outlet />
        </section>
      </main>
      <MobileNavigation />
    </>
  );
};

export default Admin;