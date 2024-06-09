import { useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import useLogout from "../../hooks/authentication/useLogout";
import Modal from "../Modal";
import Confirm from "../Confirm";
import HomeIcon from "../../icons/HomeIcon";
import UserIcon from "../../icons/UserIcon";
import MapIcon from "../../icons/MapIcon";
import BagIcon from "../../icons/BagIcon";
import HeartIcon from "../../icons/HeartIcon";
import CommentIcon from "../../icons/CommentIcon";
import TicketIcon from "../../icons/TicketIcon";
import PowerIcon from "../../icons/PowerIcon";
import technoShop from "/techno-shop.svg";

const SideBar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { pathname } = useLocation();

  const { isPendingLogout, logout } = useLogout();

  return (
    <>
      <aside className="top-8 w-full shrink-0 overflow-hidden rounded-3xl bg-white text-xl lg:sticky lg:w-72 xl:w-80">
        <div className="px-6 pt-6">
          <div className="flex size-full items-center justify-center border-b border-zinc-200 pb-6">
            <Link to="/" className="w-44">
              <img src={technoShop} alt="Techno Shop" className="w-full object-cover" />
            </Link>
          </div>
        </div>
        <div className="[&>*]:flex [&>*]:h-16 [&>*]:items-center [&>*]:gap-x-3 [&>*]:px-6 [&>*]:transition-colors">
          <NavLink to="/me" end={true} className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <HomeIcon solid={pathname === "/me"} className="size-7" />
            <span>پیشخوان</span>
          </NavLink>
          <NavLink to="/me/profile" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <UserIcon solid={pathname === "/me/profile"} className="size-7" />
            <span>نمایه</span>
          </NavLink>
          <NavLink to="/me/addresses" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <MapIcon solid={pathname === "/me/addresses"} className="size-7" />
            <span>آدرس ها</span>
          </NavLink>
          <NavLink to="/me/orders" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <BagIcon solid={pathname.startsWith("/me/orders")} className="size-7" />
            <span>سفارش ها</span>
          </NavLink>
          <NavLink to="/me/favorites" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <HeartIcon solid={pathname === "/me/favorites"} className="size-7" />
            <span>علاقه‌مندی ها</span>
          </NavLink>
          <NavLink to="/me/comments" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <CommentIcon solid={pathname === "/me/comments"} className="size-7" />
            <span>دیدگاه ها</span>
          </NavLink>
          <NavLink to="/me/tickets" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <TicketIcon solid={pathname.startsWith("/me/tickets")} className="size-7" />
            <span>تیکت ها</span>
          </NavLink>
        </div>
        <button className="h-16 w-full px-6 transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={() => setIsLogoutModalOpen(true)}>
          <div className="flex size-full items-center gap-x-3 border-t border-zinc-200 [&>*]:transition-colors">
            <PowerIcon className="size-7" />
            <span>خروج</span>
          </div>
        </button>
      </aside>
      <Modal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)}>
        <Confirm title="خارج می‌شوید؟" isPending={isPendingLogout} onCancel={() => setIsLogoutModalOpen(false)} onConfirm={() => logout(null, { onSuccess: () => setIsLogoutModalOpen(false) })} />
      </Modal>
    </>
  );
};

export default SideBar;