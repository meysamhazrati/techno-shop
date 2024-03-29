import { Link } from "react-router-dom";
import useMe from "../../hooks/authentication/me";
import useLogout from "../../hooks/authentication/logout";
import UserIcon from "../../icons/User";
import BagIcon from "../../icons/Bag";
import HeartIcon from "../../icons/Heart";
import CommentIcon from "../../icons/Comment";
import TicketIcon from "../../icons/Ticket";
import ExitIcon from "../../icons/Exit";

const ProfileButton = () => {
  const { me } = useMe();
  const { logout } = useLogout();

  return (
    <div className="group relative size-12">
      <Link to="/me" className="block size-full overflow-hidden rounded-full">
        <img src={`http://localhost:3000/users/${me?.avatar}`} alt="My Avatar" className="size-full object-cover" />
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
          <button className="h-12 w-full px-6 transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={logout}>
            <div className="flex size-full items-center gap-x-2 border-t border-zinc-200 [&>*]:transition-colors">
              <ExitIcon className="size-6" />
              <span>خروج</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;