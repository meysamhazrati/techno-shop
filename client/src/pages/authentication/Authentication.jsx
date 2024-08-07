import { useEffect } from "react";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import useMe from "../../hooks/authentication/useMe";
import technoShop from "/techno-shop.svg";

const Authentication = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isFetchingMe, isMeError } = useMe();

  useEffect(() => {
    pathname !== "/authentication/reset-password" && !isFetchingMe && !isMeError && navigate("/me");
  }, [pathname, isFetchingMe, isMeError, navigate]);

  return (pathname === "/authentication/reset-password" || isMeError) && (
    <main className="container flex min-h-svh flex-col items-center justify-center gap-y-10">
      <header>
        <Link to="/" className="max-w-48">
          <img src={technoShop} alt="تکنوشاپ" className="w-full object-cover" />
        </Link>
      </header>
      <section className="w-full rounded-3xl bg-white p-6 xs:w-96">
        <Outlet />
      </section>
      <footer>
        <p className="text-center text-lg [&>a]:text-primary-900">ورود شما به معنای پذیرش <Link to="/terms-and-conditions">قوانین و مقررات</Link> و <Link to="/privacy">حریم خصوصی</Link> است.</p>
      </footer>
    </main>
  );
};

export default Authentication;