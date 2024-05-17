import { useEffect } from "react";
import useMe from "../../hooks/authentication/me";
import Favorite from "../../components/me/Favorite";
import NoResultFound from "../../components/NoResultFound";

const Favorites = () => {
  const { me } = useMe();

  useEffect(() => {
    document.title = "تکنوشاپ - من - علاقه‌مندی ها";
  }, []);

  return me.favorites.length !== 0 ? (
    <div className="divide-y divide-zinc-200 overflow-hidden">
      {me.favorites.map((favorite) => <Favorite key={favorite._id} {...favorite} colors={favorite.colors.toSorted((firstColor, secondColor) => firstColor.price - secondColor.price)} />)}
    </div>
  ) : (
    <NoResultFound title="علاقه‌مندی‌ای پیدا نشد!" />
  );
};

export default Favorites;