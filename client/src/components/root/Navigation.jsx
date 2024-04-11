import { forwardRef } from "react";
import { Link } from "react-router-dom";
import useCategories from "../../hooks/category/categories";
import useMe from "../../hooks/authentication/me";
import HomeIcon from "../../icons/Home";
import PinIcon from "../../icons/Pin";

const Navigation = forwardRef((props, ref) => {
  const { isPendingMe, me } = useMe();
  const { categories } = useCategories(7);

  return (
    <nav ref={ref} className="relative -top-10 -z-10 hidden h-12 items-center justify-between px-7 py-3 transition-all duration-300 lg:top-0 lg:flex">
      <div className="flex items-center gap-x-3">
        <div className="flex cursor-pointer items-center gap-x-2 transition-colors hover:text-primary-900">
          <HomeIcon className="size-6" />
          <Link to="/">خانه</Link>
        </div>
        {categories?.length > 0 && (
          <>
            <div className="h-6 w-px bg-zinc-200"></div>
            <div className="flex items-center gap-x-5">
              {categories.map(({ _id, title, englishTitle }) => <Link key={_id} to={`/categories/${englishTitle.toLowerCase().split(" ").join("-")}`} className="transition-colors hover:text-primary-900">{title}</Link>)}
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