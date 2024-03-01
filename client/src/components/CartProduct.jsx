import { Link } from "react-router-dom";
import useAddToCart from "../hooks/user/addToCart";
import useRemoveFromCart from "../hooks/user/removeFromCart";
import Timer from "./Timer";
import Loader from "./Loader";
import VerifiedIcon from "../icons/Verified";
import TrashIcon from "../icons/Trash";
import MinusIcon from "../icons/Minus";
import PlusIcon from "../icons/Plus";
import TomanIcon from "../icons/Toman";
import offer from "/images/offer.svg";

const CartProduct = ({ quantity, product, color }) => {
  const { isPending: isPendingAdd, mutate: add } = useAddToCart(product._id);
  const { isPending: isPendingRemove, mutate: remove } = useRemoveFromCart(product._id,);

  return (
    <div className="grid grid-cols-[128px_1fr] items-center gap-x-4 gap-y-2 py-3">
      <Link to={`/products/${product._id}`} className="relative size-32 [&>img]:absolute [&>img]:size-full [&>img]:object-cover">
        <img src={`http://localhost:3000/products/${product.covers[1]}`} alt="Product Cover" loading="lazy" />
        <img src={`http://localhost:3000/products/${product.covers[0]}`} alt="Product Cover" loading="lazy" className="transition-opacity duration-300 hover:opacity-0" />
      </Link>
      <div>
        <h3 className="line-clamp-2 font-vazirmatn-medium text-lg">
          <Link to={`/products/${product._id}`}>{product.title}</Link>
        </h3>
        <div className="mt-2 flex flex-col gap-y-1 text-sm text-zinc-500 [&>*]:flex [&>*]:items-center [&>*]:gap-x-2">
          <div>
            <div className="mr-[1.7px] size-4 rounded-full border border-current" style={{ backgroundColor: color.code }}></div>
            <span>{color.name}</span>
          </div>
          <div>
            <VerifiedIcon className="size-5" />
            <span>گارانتی {product.warranty} ماهه</span>
          </div>
        </div>
      </div>
      {Date.parse(product.offer?.expiresAt) > Date.now() && (
        <>
          <img src={offer} alt="Offer" />
          <div className="font-vazirmatn-black text-sm text-primary-900">
            <Timer expiresAt={product.offer.expiresAt} />
          </div>
        </>
      )}
      <div className="mx-auto flex h-11 w-[104px] items-center justify-between rounded-2xl border border-primary-900 px-2 text-primary-900">
        {color.inventory > quantity ? (
          <button onClick={() => !isPendingAdd && !isPendingRemove && add({ color: color._id })}>
            <PlusIcon className="size-5 opacity-100" />
          </button>
        ) : (
          <div>
            <PlusIcon className="size-5 opacity-50" />
          </div>
        )}
        <div className="flex flex-col items-center">
          {isPendingAdd || isPendingRemove ? <Loader width={"28px"} height={"7px"} color={"#0279D9"} /> : <span className="font-vazirmatn-medium">{quantity}</span>}
          {quantity === color.inventory && <span className="-mt-2 text-xs text-zinc-400">حداکثر</span>}
        </div>
        <button onClick={() => !isPendingAdd && !isPendingRemove && remove({ color: color._id })}>{quantity > 1 ? <MinusIcon className="size-5" /> : <TrashIcon className="size-5" />}</button>
      </div>
      <div className="flex flex-col">
        {Date.parse(product.offer?.expiresAt) > Date.now() && <span className="text-sm text-zinc-400 line-through">{color.price.toLocaleString()}</span>}
        <span className="flex items-center gap-x-[2px] font-vazirmatn-bold text-lg">
          {Date.parse(product.offer?.expiresAt) > Date.now() ? (color.price - color.price * (product.offer.percent / 100)).toLocaleString() : color.price.toLocaleString()}
          <TomanIcon className="size-[18px]" />
        </span>
      </div>
    </div>
  );
};

export default CartProduct;