import { useEffect } from "react";
import useMe from "../../hooks/authentication/me";
import Favorite from "../../components/me/Favorite";
import NoResultFound from "../../components/NoResultFound";

const Favorites = () => {
  const { me } = useMe();

  useEffect(() => {
    document.title = "تکنوشاپ - من - علاقه‌مندی ها";
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">علاقه‌مندی ها</h2>
        <span className="mr-auto text-zinc-500">{me.favorites.length.toLocaleString()} علاقه‌مندی</span>
      </div>
      {me.favorites.length !== 0 ? (
        <div className="mt-4 divide-y divide-zinc-200 overflow-hidden">
          {me.favorites.map((favorite) => <Favorite key={favorite._id} {...favorite} />)}
        </div>
      ) : (
        <NoResultFound title="علاقه‌مندی‌ای پیدا نشد!" className="mt-4" />
      )}
    </>
  );
};

export default Favorites;