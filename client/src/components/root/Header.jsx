import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useMe from "../../hooks/authentication/me";
import CartButton from "./CartButton";
import ProfileButton from "./ProfileButton";
import Navigation from "./Navigation";
import SearchIcon from "../../icons/Search";
import technoShop from "/techno-shop.svg";

const Header = () => {
  const [title, setTitle] = useState("");

  const header = useRef();
  const navigation = useRef();

  const { isPendingMe, isMeError } = useMe();

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth > 1024) {
        if (document.documentElement.scrollTop < 200) {
          header.current.style.height = "128px";
          navigation.current.style.top = "0px";
        } else {
          header.current.style.height = "80px";
          navigation.current.style.top = "-40px";
        }
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={header} className="fixed z-50 w-full bg-white shadow transition-[height] duration-300">
      <div className="flex h-20 w-full items-center bg-white p-3 lg:justify-between lg:px-7">
        <div className="flex w-full items-center gap-x-7">
          <Link to="/" className="hidden w-40 lg:block">
            <img src={technoShop} alt="Techno Shop" className="object-cover" />
          </Link>
          <div className="h-12 w-full rounded-3xl bg-zinc-200 px-6 text-zinc-700 lg:w-[450px] xl:w-[550px]">
            <div className="relative flex size-full items-center gap-x-4 overflow-hidden">
              <div className="shrink-0 cursor-pointer" onClick={() => title && navigate(`/products/?title=${title}`)}>
                <SearchIcon className="size-7" />
              </div>
              <input
                type="text"
                inputMode="search"
                value={title}
                placeholder={window.innerWidth < 1024 ? "جستجو در" : "جستجو"}
                className="w-full bg-transparent text-lg outline-none placeholder:text-zinc-700"
                onInput={({ target }) => {
                  setTitle(target.value.trim());

                  if (window.innerWidth < 1024) {
                    target.nextElementSibling.style.display = target.value ? "none" : "block";
                  }
                }}
                onKeyUp={({ key }) => title && key === "Enter" && navigate(`/products/?title=${title}`)}
              />
              <img src={technoShop} alt="Techno Shop" className="pointer-events-none absolute right-[122px] w-24 object-cover lg:hidden" />
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-x-6 lg:flex">
          <CartButton />
          {isPendingMe ? (
            <div className="h-12 w-48 animate-pulse rounded-3xl bg-zinc-200"></div>
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