import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Search from "../../icons/Search";
import Cart from "../../icons/Cart";
import technoShop from "/techno-shop.svg";

const Header = () => {
  const [title, setTitle] = useState("");
  const [placeholder, setPlaceholder] = useState(window.innerWidth < 1024 ? "جستجو در" : "جستجو");

  const navigate = useNavigate();

  useEffect(() => {
    const changePlaceholder = () => setPlaceholder(window.innerWidth < 1024 ? "جستجو در" : "جستجو");

    window.addEventListener("resize", changePlaceholder);

    return () => window.removeEventListener("resize", changePlaceholder);
  }, []);

  return (
    <header className="fixed w-full shadow">
      <div className="w-full p-3 lg:flex lg:items-center lg:justify-between lg:px-7">
        <div className="flex items-center gap-x-7">
          <Link to="/" className="hidden w-40 lg:block">
            <img src={technoShop} alt="Techno Shop" className="object-cover" />
          </Link>
          <div className="h-12 w-full rounded-3xl bg-gray-200 px-6 text-zinc-700 lg:w-[450px] xl:w-[550px]">
            <div className="relative flex size-full items-center gap-x-4 overflow-hidden">
              <div className="shrink-0 cursor-pointer" onClick={() => title && navigate(`/search/${title}`)}>
                <Search className="size-7" />
              </div>
              <input
                type="text"
                inputMode="search"
                placeholder={placeholder}
                className="w-full bg-transparent text-lg outline-none placeholder:text-zinc-700 "
                value={title}
                onInput={(event) => {
                  setTitle(event.target.value);

                  if (window.innerWidth < 1024) {
                    event.target.nextElementSibling.style.display = event.target.value ? "none" : "block";
                  }
                }}
                onKeyUp={(event) => title && event.key === "Enter" && navigate(`/search/${title}`)}
              />
              <img src={technoShop} alt="Techno Shop" className="pointer-events-none absolute right-[122px] w-24 object-cover lg:hidden" />
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-x-6 lg:flex">
          <div className="group relative size-12 rounded-full transition-colors hover:bg-gray-200">
            <Link to="/me/cart" className="flex size-full items-center justify-center rounded-full">
              <Cart className="size-7 transition-colors group-hover:stroke-zinc-700" />
            </Link>
          </div>
          <div className="relative flex h-12 w-48 flex-1 items-center text-lg text-white">
            <Link to="/login" className="flex h-full w-28 items-center justify-center rounded-3xl bg-primary-500 transition-colors hover:bg-primary-600">ورود</Link>
            <Link to="/register" className="absolute right-20 flex h-full w-28 items-center justify-center rounded-3xl bg-primary-900 transition-colors hover:bg-primary-800">ثبت نام</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;