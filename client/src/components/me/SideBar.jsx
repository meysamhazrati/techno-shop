import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useLogout from "../../hooks/authentication/useLogout";
import Modal from "../Modal";
import Confirm from "../Confirm";
import HomeIcon from "../../icons/Home";
import UserIcon from "../../icons/User";
import MapIcon from "../../icons/Map";
import BagIcon from "../../icons/Bag";
import HeartIcon from "../../icons/Heart";
import CommentIcon from "../../icons/Comment";
import TicketIcon from "../../icons/Ticket";
import ExitIcon from "../../icons/Exit";
import technoShop from "/techno-shop.svg";

const SideBar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { isPendingLogout, logout } = useLogout();

  return (
    <>
      <aside className="top-8 w-full shrink-0 overflow-hidden rounded-3xl bg-white lg:sticky lg:w-72 xl:w-80">
        <div className="px-6 pt-6">
          <div className="flex size-full items-center justify-center border-b border-zinc-200 pb-6">
            <Link to="/" className="w-44">
              <img src={technoShop} alt="Techno Shop" className="w-full object-cover" />
            </Link>
          </div>
        </div>
        <div className="text-xl [&>*]:flex [&>*]:h-16 [&>*]:items-center [&>*]:gap-x-3 [&>*]:px-6 [&>*]:transition-colors">
          <NavLink to="/me" end={true} className={({ isActive }) => isActive ? "bg-primary-900 text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <HomeIcon className="size-7" />
            <span>پیشخوان</span>
          </NavLink>
          <NavLink to="/me/profile" className={({ isActive }) => isActive ? "bg-primary-900 text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <UserIcon className="size-7" />
            <span>نمایه</span>
          </NavLink>
          <NavLink to="/me/addresses" className={({ isActive }) => isActive ? "bg-primary-900 text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <MapIcon className="size-7" />
            <span>آدرس ها</span>
          </NavLink>
          <NavLink to="/me/orders" className={({ isActive }) => isActive ? "bg-primary-900 text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <BagIcon className="size-7" />
            <span>سفارش ها</span>
          </NavLink>
          <NavLink to="/me/favorites" className={({ isActive }) => isActive ? "bg-primary-900 text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <HeartIcon className="size-7" />
            <span>علاقه‌مندی ها</span>
          </NavLink>
          <NavLink to="/me/comments" className={({ isActive }) => isActive ? "bg-primary-900 text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <CommentIcon className="size-7" />
            <span>دیدگاه ها</span>
          </NavLink>
          <NavLink to="/me/tickets" className={({ isActive }) => isActive ? "bg-primary-900 text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <TicketIcon className="size-7" />
            <span>تیکت ها</span>
          </NavLink>
        </div>
        <button className="h-16 w-full px-6 transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={() => setIsLogoutModalOpen(true)}>
          <div className="flex size-full items-center gap-x-2 border-t border-zinc-200 [&>*]:transition-colors">
            <ExitIcon className="size-7" />
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