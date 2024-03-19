import { Link } from "react-router-dom";
import ProductCover from "./ProductCover";
import ProductButton from "./ProductButton";
import ProductPrice from "./ProductPrice";
import AmazingOfferTimer from "./AmazingOfferTimer";
import VerifiedIcon from "../icons/Verified";

const CartProduct = ({ quantity, product, color }) => {
  return (
    <div className="grid grid-cols-[128px_1fr] items-center gap-x-4 gap-y-2 py-3">
      <div className="relative size-32">
        <ProductCover id={product._id} covers={product.covers} />
        {Date.parse(product.offer?.expiresAt) > Date.now() && <div className="absolute right-0 top-4 z-10 flex h-5 w-9 items-center justify-center rounded-full bg-primary-900 font-vazirmatn-medium text-xs text-white">{product.offer.percent}%</div>}
      </div>
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
      {Date.parse(product.offer?.expiresAt) > Date.now() && <AmazingOfferTimer width="full" fontSize="xs" expiresAt={product.offer.expiresAt} />}
      <ProductButton id={product._id} quantity={quantity} color={color} />
      <ProductPrice price={color.price} offer={product.offer} priceFontSize="base" discountedPriceFontSize="xs" gapX="px" iconSize="4" />
    </div>
  );
};

export default CartProduct;