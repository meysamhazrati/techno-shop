import { forwardRef } from "react";
import { Link, NavLink } from "react-router-dom";
import useCategories from "../../hooks/category/useCategories";
import useMe from "../../hooks/authentication/useMe";
import HomeIcon from "../../icons/HomeIcon";
import PinIcon from "../../icons/PinIcon";

const Navigation = forwardRef((props, ref) => {
  const { isPendingMe, me } = useMe();
  const { categories } = useCategories();

  return (
    <nav ref={ref} className="relative -top-10 -z-10 hidden h-12 items-center justify-between px-7 py-3 transition-all duration-300 lg:top-0 lg:flex">
      <div className="flex items-center gap-x-3">
        <NavLink to="/" className={({ isActive }) => `flex cursor-pointer items-center gap-x-2 transition-colors ${isActive ? "text-primary-900" : "hover:text-primary-900"}`}>
          <HomeIcon className="size-6" />
          <span>خانه</span>
        </NavLink>
        {categories?.length > 0 && (
          <>
            <div className="h-6 w-px bg-zinc-200"></div>
            <div className="flex items-center gap-x-5">
              {categories.map(({ _id, title, englishTitle }) => <NavLink key={_id} to={`/categories/${englishTitle.toLowerCase().split(" ").join("-")}`} className={({ isActive }) => isActive ? "text-primary-900" : "transition-colors hover:text-primary-900"}>{title}</NavLink>)}
            </div>
          </>
        )}
      </div>
      {isPendingMe ? (
        <div className="flex items-center gap-x-2">
          <PinIcon className="size-6" />
          <span>در حال بارگذاری</span>
        </div>
      ) : (
        <div className="flex cursor-pointer items-center gap-x-2 transition-colors hover:text-primary-900">
          <PinIcon className="size-6" />
          <Link to="/me/addresses">{me?.addresses.length ? `${me.addresses[0].province}، ${me.addresses[0].city}` : "لطفا مقصد خود را انتخاب کنید"}</Link>
        </div>
      )}
    </nav>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;