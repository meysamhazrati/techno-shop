import { useState, useEffect } from "react";
import useMe from "../hooks/authentication/me";
import useAddToFavorites from "../hooks/user/addToFavorites";
import useRemoveFromFavorites from "../hooks/user/removeFromFavorites";
import HeartIcon from "../icons/Heart";

const ProductFavoriteButton = ({ id, size }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { me } = useMe();
  const { isPendingAddToFavorites, addToFavorites } = useAddToFavorites(id);
  const { isPendingRemoveFromFavorites, removeFromFavorites } = useRemoveFromFavorites(id);

  useEffect(() => {
    const isExists = me?.favorites.some((product) => id === product._id);

    setIsFavorite(isExists);
  }, [me, id]);

  const add = () => !isPendingAddToFavorites && !isPendingRemoveFromFavorites && addToFavorites();

  const remove = () => !isPendingAddToFavorites && !isPendingRemoveFromFavorites && removeFromFavorites();

  return (
    <button className="flex items-center justify-center" onClick={() => (isFavorite ? remove() : add())}>
      <HeartIcon className={`size-${size} ${isFavorite ? "fill-red-500 stroke-red-500" : "fill-none stroke-black"}`} />
    </button>
  );
};

export default ProductFavoriteButton;