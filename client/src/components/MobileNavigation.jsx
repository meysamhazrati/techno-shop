import { useLocation, Link } from "react-router-dom";
import HomeIcon from "../icons/Home";
import HomeSolidIcon from "../icons/HomeSolid";
import SquaresIcon from "../icons/Squares";
import SquaresSolidIcon from "../icons/SquaresSolid";
import CartIcon from "../icons/Cart";
import CartSolidIcon from "../icons/CartSolid";
import UserIcon from "../icons/User";
import UserSolidIcon from "../icons/UserSolid";

const MobileNavigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid h-16 grid-cols-4 items-center gap-x-3 bg-white p-3 text-center shadow xs:h-20 xs:py-3 lg:hidden">
      <Link to="/">
        {location.pathname === "/" ? <HomeSolidIcon className="mx-auto size-7" /> : <HomeIcon className="mx-auto size-7" />}
        <span className="mt-1.5 hidden xs:block">خانه</span>
      </Link>
      <Link to="/categories">
        {location.pathname.startsWith("/categories") ? <SquaresSolidIcon className="mx-auto size-7" /> : <SquaresIcon className="mx-auto size-7" />}
        <span className="mt-1.5 hidden xs:block">دسته‌بندی ها</span>
      </Link>
      <Link to="/me/cart">
        {location.pathname === "/me/cart" ? <CartSolidIcon className="mx-auto size-7" /> : <CartIcon className="mx-auto size-7" />}
        <span className="mt-1.5 hidden xs:block">سبد خرید</span>
      </Link>
      <Link to="/me">
        {location.pathname.startsWith("/me") && location.pathname !== "/me/cart" ? <UserSolidIcon className="mx-auto size-7" /> : <UserIcon className="mx-auto size-7" />}
        <span className="mt-1.5 hidden xs:block">حساب کاربری</span>
      </Link>
    </nav>
  );
};

export default MobileNavigation;