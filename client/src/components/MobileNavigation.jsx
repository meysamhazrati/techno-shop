import { useLocation, NavLink } from "react-router-dom";
import useMe from "../hooks/authentication/useMe";
import HomeIcon from "../icons/HomeIcon";
import SquaresIcon from "../icons/SquaresIcon";
import CartIcon from "../icons/CartIcon";
import UserIcon from "../icons/UserIcon";
import SettingsIcon from "../icons/SettingsIcon";

const MobileNavigation = () => {
  const { pathname } = useLocation();

  const { isPendingMe, isMeError, me } = useMe();

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 grid h-14 ${(!isPendingMe && !isMeError && me.role === "ADMIN") ? "grid-cols-5" : "grid-cols-4"} items-center gap-x-3 bg-white px-3 text-center text-sm shadow xs:h-[72px] lg:hidden`}>
      <NavLink to="/" className={({ isActive }) => isActive ? "font-vazirmatn-medium" : "font-vazirmatn-regular"}>
        <HomeIcon solid={pathname === "/"} className="mx-auto size-7" />
        <span className="mt-1 hidden xs:block">خانه</span>
      </NavLink>
      <NavLink to="/categories" className={({ isActive }) => isActive ? "font-vazirmatn-medium" : "font-vazirmatn-regular"}>
        <SquaresIcon solid={pathname.startsWith("/categories")} className="mx-auto size-7" />
        <span className="mt-1 hidden xs:block">دسته‌بندی ها</span>
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => isActive ? "font-vazirmatn-medium" : "font-vazirmatn-regular"}>
        <CartIcon solid={pathname === "/cart"} className="mx-auto size-7" />
        <span className="mt-1 hidden xs:block">سبد خرید</span>
      </NavLink>
      <NavLink to="/me" className={({ isActive }) => isActive ? "font-vazirmatn-medium" : "font-vazirmatn-regular"}>
        <UserIcon solid={pathname.startsWith("/me")} className="mx-auto size-7" />
        <span className="mt-1 hidden xs:block">من</span>
      </NavLink>
      {!isPendingMe && !isMeError && me.role === "ADMIN" && (
        <NavLink to="/admin" className={({ isActive }) => isActive ? "font-vazirmatn-medium" : "font-vazirmatn-regular"}>
          <SettingsIcon solid={pathname.startsWith("/admin")} className="mx-auto size-7" />
          <span className="mt-1 hidden xs:block">مدیریت</span>
        </NavLink>
      )}
    </nav>
  );
};

export default MobileNavigation;