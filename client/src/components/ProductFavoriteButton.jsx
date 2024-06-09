import { useState, useEffect } from "react";
import useMe from "../hooks/authentication/useMe";
import useCreateFavorite from "../hooks/favorite/useCreateFavorite";
import useRemoveFavorite from "../hooks/favorite/useRemoveFavorite";
import Loader from "../components/Loader";
import HeartIcon from "../icons/HeartIcon";

const ProductFavoriteButton = ({ product }) => {
  const [id, setId] = useState(null);

  const { me } = useMe();
  const { isPendingCreateFavorite, createFavorite } = useCreateFavorite();
  const { isPendingRemoveFavorite, removeFavorite } = useRemoveFavorite(id);

  useEffect(() => {
    setId(me?.favorites.find((favorite) => favorite.product._id === product)?._id);
  }, [me, product]);

  return (
    <button disabled={isPendingCreateFavorite || isPendingRemoveFavorite} className={`flex size-14 shrink-0 items-center justify-center rounded-full transition-colors ${id ? "hover:bg-red-100" : "hover:bg-zinc-200 hover:text-zinc-700"}`} onClick={() => (id ? removeFavorite() : createFavorite({ product }))}>
      {isPendingCreateFavorite || isPendingRemoveFavorite ? (
        <Loader width={"36px"} height={"9px"} color={id ? "#ef4444" : "#18181b"} />
      ) : (
        <HeartIcon className={`size-9 ${id ? "fill-red-500 stroke-red-500" : "fill-none stroke-current"}`} />
      )}
    </button>
  );
};

export default ProductFavoriteButton;