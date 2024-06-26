import { useState } from "react";
import { Link } from "react-router-dom";
import useMe from "../../hooks/authentication/useMe";
import useLogout from "../../hooks/authentication/useLogout";
import UserAvatar from "../UserAvatar";
import Modal from "../Modal";
import Confirm from "../Confirm";
import UserIcon from "../../icons/UserIcon";
import BagIcon from "../../icons/BagIcon";
import HeartIcon from "../../icons/HeartIcon";
import CommentIcon from "../../icons/CommentIcon";
import TicketIcon from "../../icons/TicketIcon";
import PowerIcon from "../../icons/PowerIcon";

const ProfileButton = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { me } = useMe();
  const { isPendingLogout, logout } = useLogout();

  return (
    <>
      <div className="group relative size-12">
        <Link to="/me" className="flex items-center justify-center size-full overflow-hidden rounded-full">
          <UserAvatar user={me} className="size-full" />
        </Link>
        {me && (
          <div className="invisible absolute left-0 top-auto w-64 overflow-hidden rounded-3xl bg-white opacity-0 shadow transition-all group-hover:visible group-hover:opacity-100">
            <button className="h-12 w-full px-6 transition-colors hover:bg-zinc-200 hover:text-zinc-700">
              <Link to="/me/profile" className="flex size-full items-center gap-x-2 border-b border-zinc-200 [&>*]:transition-colors">
                <UserIcon className="size-6" />
                <span>{me.firstName} {me.lastName}</span>
              </Link>
            </button>
            <div className="[&>*]:flex [&>*]:h-12 [&>*]:w-full [&>*]:items-center [&>*]:gap-x-2 [&>*]:px-6 [&>*]:transition-colors hover:[&>*]:bg-zinc-200 hover:[&>*]:text-zinc-700">
              <Link to="/me/orders" className="[&>*]:transition-colors">
                <BagIcon className="size-6" />
                <span>سفارش ها</span>
              </Link>
              <Link to="/me/favorites" className="[&>*]:transition-colors">
                <HeartIcon className="size-6" />
                <span>علاقه‌مندی ها</span>
              </Link>
              <Link to="/me/comments" className="[&>*]:transition-colors">
                <CommentIcon className="size-6" />
                <span>دیدگاه ها</span>
              </Link>
              <Link to="/me/tickets" className="[&>*]:transition-colors">
                <TicketIcon className="size-6" />
                <span>تیکت ها</span>
              </Link>
            </div>
            <button className="h-12 w-full px-6 transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={() => setIsLogoutModalOpen(true)}>
              <div className="flex size-full items-center gap-x-2 border-t border-zinc-200 [&>*]:transition-colors">
                <PowerIcon className="size-6" />
                <span>خروج</span>
              </div>
            </button>
          </div>
        )}
      </div>
      <Modal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)}>
        <Confirm title="خارج می‌شوید؟" isPending={isPendingLogout} onCancel={() => setIsLogoutModalOpen(false)} onConfirm={() => logout(null, { onSuccess: () => setIsLogoutModalOpen(false) })} />
      </Modal>
    </>
  );
};

export default ProfileButton;