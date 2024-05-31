import { useState, useEffect } from "react";
import useMe from "../hooks/authentication/me";
import useAddToCart from "../hooks/user/addToCart";
import useRemoveFromCart from "../hooks/user/removeFromCart";
import Loader from "./Loader";
import PlusIcon from "../icons/Plus";
import MinusIcon from "../icons/Minus";
import TrashIcon from "../icons/Trash";

const ProductButton = ({ id, color, disabled }) => {
  const [quantity, setQuantity] = useState(0);

  const { me } = useMe();
  const { isPendingAddToCart, addToCart } = useAddToCart(id);
  const { isPendingRemoveFromCart, removeFromCart } = useRemoveFromCart(id);

  useEffect(() => {
    const isExists = me?.cart.find(({ product, color: color_ }) => id === product._id && color._id === color_._id);

    setQuantity(isExists ? isExists.quantity : 0);
  }, [me, id, color]);

  return !disabled && quantity ? (
    <div className="flex h-12 w-full items-center justify-between gap-x-1 overflow-hidden text-nowrap rounded-full border border-primary-900 px-2 text-primary-900">
      <button disabled={color.inventory <= quantity || isPendingAddToCart || isPendingRemoveFromCart} className="disabled:opacity-50" onClick={() => addToCart({ color: color._id })}>
        <PlusIcon className="size-5" />
      </button>
      <div className="flex flex-col items-center">
        {isPendingAddToCart || isPendingRemoveFromCart ? <Loader width={"28px"} height={"7px"} color={"#0279D9"} /> : <span className="font-vazirmatn-medium">{quantity.toLocaleString()}</span>}
        {color.inventory === quantity && !isPendingRemoveFromCart && <span className="-mt-2 text-xs text-zinc-400">حداکثر</span>}
      </div>
      <button disabled={isPendingAddToCart || isPendingRemoveFromCart} onClick={() => removeFromCart({ color: color._id })}>
        {quantity > 1 ? <MinusIcon className="size-5" /> : <TrashIcon className="size-5" />}
      </button>
    </div>
  ) : (
    <button disabled={disabled || isPendingAddToCart || isPendingRemoveFromCart} className="flex h-12 w-full items-center justify-center overflow-hidden text-nowrap rounded-full bg-primary-900 font-vazirmatn-medium text-white transition-colors enabled:hover:bg-primary-800 disabled:bg-primary-100" onClick={() => addToCart({ color: color._id })}>
      {isPendingAddToCart || isPendingRemoveFromCart ? <Loader width={"28px"} height={"7px"} color={"#ffffff"} /> : "افزودن به سبد خرید"}
    </button>
  );
};

export default ProductButton;