import { useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import useMe from "../../hooks/authentication/me";
import technoShop from "/techno-shop.svg";

const Authentication = () => {
  const navigate = useNavigate();

  const { isFetchingMe, isMeError } = useMe();

  useEffect(() => {
    !isFetchingMe && !isMeError && navigate("/");
  }, [isFetchingMe, isMeError, navigate]);

  return isMeError && (
    <main className="container flex min-h-svh flex-col items-center justify-center gap-y-10">
      <header>
        <Link to="/" className="max-w-48">
          <img src={technoShop} alt="Techno Shop" className="w-full object-cover" />
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