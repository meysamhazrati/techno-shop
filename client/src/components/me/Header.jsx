import useMe from "../../hooks/authentication/me";
import UserAvatar from "../UserAvatar";

const Header = () => {
  const { me } = useMe();

  return (
    <header className="flex w-full items-center rounded-3xl bg-white p-6 sm:justify-between">
      <div className="flex items-center gap-x-3 overflow-auto">
        <UserAvatar user={me} className="size-16 text-xl" />
        <div>
          <h5 className="line-clamp-1 font-vazirmatn-medium text-2xl">{me.firstName} {me.lastName}</h5>
          <span className="mt-1 block text-lg text-zinc-400">{me.email}</span>
        </div>
      </div>
      <span className="hidden text-lg text-zinc-400 sm:block">ورود از {new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(me.createdAt))}</span>
    </header>
  );
};

export default Header;