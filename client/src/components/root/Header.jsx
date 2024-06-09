import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import useMe from "../../hooks/authentication/useMe";
import CartButton from "./CartButton";
import ProfileButton from "./ProfileButton";
import Navigation from "./Navigation";
import SearchIcon from "../../icons/SearchIcon";
import technoShop from "/techno-shop.svg";

const Header = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search")?.split("-").join(" ") || "");

  const header = useRef();
  const navigation = useRef();

  const { isPendingMe, isMeError } = useMe();

  const navigate = useNavigate();

  useEffect(() => {
    let currentScrollY = window.scrollY;
    let lastScrollY = window.scrollY;
    let lastScrollDown = 0;
    let lastScrollUp = 0;

    const onScroll = () => {
      if (window.innerWidth > 1024) {
        currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
          lastScrollDown = currentScrollY;

          if (lastScrollDown - lastScrollUp > 200) {
            header.current.style.height = "80px";
            navigation.current.style.top = "-40px";
          }
        } else {
          lastScrollUp = currentScrollY;

          if (lastScrollDown - lastScrollUp > 200 || currentScrollY < 50) {
            header.current.style.height = "128px";
            navigation.current.style.top = "0px";
          }
        }

        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={header} className="fixed z-50 h-20 w-full bg-white shadow transition-all duration-300 lg:h-32">
      <div className="flex h-20 w-full items-center bg-white p-3 lg:justify-between lg:px-7">
        <div className="flex w-full items-center gap-x-7">
          <Link to="/" className="hidden w-40 lg:block">
            <img src={technoShop} alt="Techno Shop" className="object-cover" />
          </Link>
          <div className="h-12 w-full rounded-3xl bg-zinc-200 px-6 text-zinc-700 lg:w-[450px] xl:w-[550px]">
            <div className="relative flex size-full items-center gap-x-4 overflow-hidden">
              <div className="shrink-0 cursor-pointer" onClick={() => search.trim() && navigate(`/products/?search=${search.trim().split(" ").join("-")}`)}>
                <SearchIcon className="size-7" />
              </div>
              <input
                type="text"
                inputMode="search"
                value={search}
                placeholder={window.innerWidth < 1024 ? "جستجو در" : "جستجو"}
                className="w-full bg-transparent text-lg outline-none placeholder:text-zinc-700"
                onInput={({ target }) => {
                  setSearch(target.value);

                  if (window.innerWidth < 1024) {
                    target.nextElementSibling.style.display = target.value ? "none" : "block";
                  }
                }}
                onKeyUp={({ key }) => search.trim() && key === "Enter" && navigate(`/products/?search=${search.trim().split(" ").join("-")}`)}
              />
              <img src={technoShop} alt="Techno Shop" className="pointer-events-none absolute right-[122px] w-24 object-cover lg:hidden" />
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-x-6 lg:flex">
          <CartButton />
          {isPendingMe ? (
            <div className="size-12 animate-pulse rounded-full bg-skeleton"></div>
          ) : isMeError ? (
            <div className="relative flex h-12 w-48 flex-1 items-center text-lg text-white">
              <Link to="/authentication/login" className="flex h-full w-28 items-center justify-center rounded-3xl bg-primary-500 transition-colors hover:bg-primary-600">ورود</Link>
              <Link to="/authentication/register" className="absolute right-20 flex h-full w-28 items-center justify-center rounded-3xl bg-primary-900 transition-colors hover:bg-primary-800">ثبت نام</Link>
            </div>
          ) : (
            <ProfileButton />
          )}
        </div>
      </div>
      <Navigation ref={navigation} />
    </header>
  );
};

export default Header;