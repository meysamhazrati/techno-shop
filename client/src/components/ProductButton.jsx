import useAddToCart from "../hooks/user/addToCart";
import useRemoveFromCart from "../hooks/user/removeFromCart";
import Loader from "./Loader";
import PlusIcon from "../icons/Plus";
import MinusIcon from "../icons/Minus";
import TrashIcon from "../icons/Trash";

const ProductButton = ({ id, quantity, color }) => {
  const { isPendingAddToCart, addToCart } = useAddToCart(id);
  const { isPendingRemoveFromCart, removeFromCart } = useRemoveFromCart(id);

  const add = () => !isPendingAddToCart && !isPendingRemoveFromCart && addToCart({ color: color._id });

  const remove = () => !isPendingAddToCart && !isPendingRemoveFromCart && removeFromCart({ color: color._id });

  return quantity ? (
    <div className="flex h-12 w-full items-center justify-between gap-x-1 overflow-hidden text-nowrap rounded-full border border-primary-900 px-2 text-primary-900">
      {color.inventory > quantity ? (
        <button onClick={add}>
          <PlusIcon className="size-5 opacity-100" />
        </button>
      ) : (
        <div>
          <PlusIcon className="size-5 opacity-50" />
        </div>
      )}
      <div className="flex flex-col items-center">
        {isPendingAddToCart || isPendingRemoveFromCart ? <Loader width={"28px"} height={"7px"} color={"#0279D9"} /> : <span className="font-vazirmatn-medium">{quantity}</span>}
        {color.inventory === quantity && <span className="-mt-2 text-xs text-zinc-400">حداکثر</span>}
      </div>
      <button onClick={remove}>
        {quantity > 1 ? <MinusIcon className="size-5" /> : <TrashIcon className="size-5" />}
      </button>
    </div>
  ) : (
    <button className="flex h-12 w-full items-center justify-center overflow-hidden text-nowrap rounded-full bg-primary-900 font-vazirmatn-medium text-white transition-colors hover:bg-primary-800" onClick={add}>
      {isPendingAddToCart || isPendingRemoveFromCart ? <Loader width={"28px"} height={"7px"} color={"#ffffff"} /> : "افزودن به سبد خرید"}
    </button>
  );
};

export default ProductButton;