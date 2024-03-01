import { Link } from "react-router-dom";
import useMe from "../../hooks/authentication/me";
import UserIcon from "../../icons/User";
import BagIcon from "../../icons/Bag";
import HeartIcon from "../../icons/Heart";
import CommentIcon from "../../icons/Comment";
import TicketIcon from "../../icons/Ticket";
import ExitIcon from "../../icons/Exit";

const ProfileButton = () => {
  const { data } = useMe();

  return (
    <div className="group relative size-12">
      <Link to="/me" className="block size-full overflow-hidden rounded-full">
        <img src={`http://localhost:3000/users/${data?.avatar}`} alt="My Avatar" className="size-full object-cover" />
      </Link>
      {data && (
        <div className="invisible absolute left-0 top-auto w-64 overflow-hidden rounded-2xl bg-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
          <button className="h-12 w-full px-6 hover:bg-zinc-200 hover:text-zinc-700">
            <Link to="/me/profile" className="flex size-full items-center gap-x-2 border-b border-zinc-200">
              <UserIcon className="size-6" />
              <span>{`${data.firstName} ${data.lastName}`}</span>
            </Link>
          </button>
          <div className="[&>*]:flex [&>*]:h-12 [&>*]:w-full [&>*]:items-center [&>*]:gap-x-2 [&>*]:px-6 hover:[&>*]:bg-zinc-200 hover:[&>*]:text-zinc-700">
            <Link to="/me/orders">
              <BagIcon className="size-6" />
              <span>سفارش ها</span>
            </Link>
            <Link to="/me/favorites">
              <HeartIcon className="size-6" />
              <span>علاقه‌مندی ها</span>
            </Link>
            <Link to="/me/comments">
              <CommentIcon className="size-6" />
              <span>دیدگاه ها</span>
            </Link>
            <Link to="/me/tickets">
              <TicketIcon className="size-6" />
              <span>تیکت ها</span>
            </Link>
          </div>
          <button className="h-12 w-full px-6 hover:bg-zinc-200 hover:text-zinc-700">
            <div className="flex size-full items-center gap-x-2 border-t border-zinc-200">
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