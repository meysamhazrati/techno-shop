import { useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import useMe from "../../hooks/authentication/useMe";
import useLogout from "../../hooks/authentication/useLogout";
import UserAvatar from "../UserAvatar";
import Modal from "../Modal";
import Confirm from "../Confirm";
import HomeIcon from "../../icons/HomeIcon";
import UserIcon from "../../icons/UserIcon";
import MapIcon from "../../icons/MapIcon";
import VerifiedIcon from "../../icons/VerifiedIcon";
import SquaresIcon from "../../icons/SquaresIcon";
import BoxIcon from "../../icons/BoxIcon";
import BagIcon from "../../icons/BagIcon";
import BookIcon from "../../icons/BookIcon";
import CommentIcon from "../../icons/CommentIcon";
import TicketIcon from "../../icons/TicketIcon";
import TagIcon from "../../icons/TagIcon";
import GiftIcon from "../../icons/GiftIcon";
import PowerIcon from "../../icons/PowerIcon";
import technoShop from "/techno-shop.svg";

const SideBar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { pathname } = useLocation();

  const { me } = useMe();
  const { isPendingLogout, logout } = useLogout();

  return (
    <>
      <aside className="w-full shrink-0 overflow-hidden rounded-3xl bg-white text-xl lg:sticky lg:top-8 lg:w-72 xl:w-80">
        <div className="px-6 pt-6">
          <div className="flex size-full flex-col items-center justify-center gap-y-6 border-b border-zinc-200 pb-6">
            <Link to="/" className="w-44">
              <img src={technoShop} alt="Techno Shop" className="w-full object-cover" />
            </Link>
            <div className="flex flex-col items-center gap-y-3">
              <UserAvatar user={me} className="size-16 text-xl" />
              <div className="text-center">
                <h5 className="line-clamp-1 font-vazirmatn-medium text-2xl">{me.firstName} {me.lastName}</h5>
                <span className="mt-1 block text-lg text-zinc-400">{me.email}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="[&>*]:flex [&>*]:h-16 [&>*]:items-center [&>*]:gap-x-3 [&>*]:px-6 [&>*]:transition-colors">
          <NavLink to="/admin" end={true} className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <HomeIcon solid={pathname === "/admin"} className="size-7" />
            <span>پیشخوان</span>
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <UserIcon solid={pathname === "/admin/users"} className="size-7" />
            <span>کاربر ها</span>
          </NavLink>
          <NavLink to="/admin/addresses" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <MapIcon solid={pathname === "/admin/addresses"} className="size-7" />
            <span>آدرس ها</span>
          </NavLink>
          <NavLink to="/admin/brands" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <VerifiedIcon solid={pathname === "/admin/brands"} className="size-7" />
            <span>برند ها</span>
          </NavLink>
          <NavLink to="/admin/categories" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <SquaresIcon solid={pathname === "/admin/categories"} className="size-7" />
            <span>دسته‌بندی‌ ها</span>
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <BoxIcon solid={pathname === "/admin/products"} className="size-7" />
            <span>محصول ها</span>
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <BagIcon solid={pathname === "/admin/orders"} className="size-7" />
            <span>سفارش ها</span>
          </NavLink>
          <NavLink to="/admin/articles" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <BookIcon solid={pathname === "/admin/articles"} className="size-7" />
            <span>مقاله ها</span>
          </NavLink>
          <NavLink to="/admin/comments" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <CommentIcon solid={pathname === "/admin/comments"} className="size-7" />
            <span>دیدگاه ها</span>
          </NavLink>
          <NavLink to="/admin/tickets" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <TicketIcon solid={pathname === "/admin/tickets"} className="size-7" />
            <span>تیکت ها</span>
          </NavLink>
          <NavLink to="/admin/offers" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <TagIcon solid={pathname === "/admin/offers"} className="size-7" />
            <span>پیشنهاد ها</span>
          </NavLink>
          <NavLink to="/admin/discount-codes" className={({ isActive }) => isActive ? "bg-primary-900 font-vazirmatn-medium text-white" : "hover:bg-zinc-200 hover:text-zinc-700 [&>*]:transition-colors"}>
            <GiftIcon solid={pathname === "/admin/discount-codes"} className="size-7" />
            <span>کد‌تخفیف ها</span>
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