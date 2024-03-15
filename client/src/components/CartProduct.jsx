import { Link } from "react-router-dom";
import Timer from "./Timer";
import ProductButton from "./ProductButton";
import VerifiedIcon from "../icons/Verified";
import TomanIcon from "../icons/Toman";
import offer from "/images/offer.svg";

const CartProduct = ({ quantity, product, color }) => {
  return (
    <div className="grid grid-cols-[128px_1fr] items-center gap-x-4 gap-y-2 py-3">
      <Link to={`/products/${product._id}`} className="relative size-32 [&>img]:absolute [&>img]:size-full [&>img]:object-cover">
        {Date.parse(product.offer?.expiresAt) > Date.now() && <div className="absolute right-0 top-4 z-10 flex h-5 w-9 items-center justify-center rounded-full bg-primary-900 font-vazirmatn-medium text-xs text-white">{product.offer.percent}%</div>}
        <img src={`http://localhost:3000/products/${product.covers[1]}`} alt="Product Cover" loading="lazy" />
        <img src={`http://localhost:3000/products/${product.covers[0]}`} alt="Product Cover" loading="lazy" className="transition-opacity duration-300 hover:opacity-0" />
      </Link>
      <div>
        <h3 className="h-14 font-vazirmatn-medium text-lg">
          <Link to={`/products/${product._id}`} className="line-clamp-2 transition-colors hover:text-primary-900">{product.title}</Link>
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
      <ProductButton id={product._id} quantity={quantity} color={color} />
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