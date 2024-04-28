import { useEffect } from "react";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import useMe from "../../hooks/authentication/me";
import technoShop from "/techno-shop.svg";

const Authentication = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isFetchingMe, isMeError } = useMe();

  useEffect(() => {
    navigate(!isFetchingMe && !isMeError ? "/" : pathname === "/authentication" ? "/authentication/login" : pathname);
  }, [isFetchingMe, isMeError, pathname, navigate]);

  return isMeError && (
    <main className="container flex h-svh w-full flex-col items-center justify-center gap-y-10">
      <Link to="/" className="max-w-48">
        <img src={technoShop} alt="Techno Shop" className="w-full object-cover" />
      </Link>
      <section className="w-full rounded-3xl bg-white p-6 xs:w-96">
        <Outlet />
      </section>
      <p className="text-center text-lg [&>a]:text-primary-900">عضویت شما به معنای پذیرش <Link to="/terms-and-conditions">قوانین و مقررات</Link> و <Link to="/privacy">حریم خصوصی</Link> است.</p>
    </main>
  );
};

export default Authentication;