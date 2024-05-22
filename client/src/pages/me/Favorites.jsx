import { useState, useEffect } from "react";
import useMe from "../../hooks/authentication/me";
import useEmptyFavorites from "../../hooks/user/emptyFavorites";
import Favorite from "../../components/me/Favorite";
import NoResultFound from "../../components/NoResultFound";
import Modal from "../../components/Modal";
import Confirm from "../../components/Confirm";

const Favorites = () => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const { me } = useMe();
  const { isPendingEmptyFavorites, emptyFavorites } = useEmptyFavorites();

  useEffect(() => {
    document.title = "تکنوشاپ - من - علاقه‌مندی ها";
  }, []);

  return me.favorites.length !== 0 ? (
    <>
      <div className="flex items-center justify-between gap-x-2">
        <span className="text-lg text-zinc-400">{me.favorites.length.toLocaleString()} علاقه‌مندی</span>
        <button disabled={isPendingEmptyFavorites} className="flex items-center gap-x-2 text-red-500" onClick={() => setIsRemoveModalOpen(true)}>حذف همه</button>
      </div>
      <div className="mt-4 divide-y divide-zinc-200 overflow-hidden">
        {me.favorites.map((favorite) => <Favorite key={favorite._id} {...favorite} colors={favorite.colors.toSorted((firstColor, secondColor) => firstColor.price - secondColor.price)} />)}
      </div>
      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)}>
        <Confirm title="علاقه‌مندی ها را خالی می‌کنید؟" isPending={isPendingEmptyFavorites} onCancel={() => setIsRemoveModalOpen(false)} onConfirm={() => emptyFavorites(null, { onSuccess: () => setIsRemoveModalOpen(false) })} />
      </Modal>
    </>
  ) : (
    <NoResultFound title="علاقه‌مندی‌ای پیدا نشد!" />
  );
};

export default Favorites;