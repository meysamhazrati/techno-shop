import { Link } from "react-router-dom";
import ProductCover from "../ProductCover";
import ProductButton from "../ProductButton";
import ProductPrice from "../ProductPrice";
import AmazingOfferTimer from "../AmazingOfferTimer";
import ShieldIcon from "../../icons/ShieldIcon";

const CartProduct = ({ product, color }) => {
  return (
    <div className={`grid grid-cols-[150px_1fr] items-center gap-x-4 gap-y-2 overflow-auto py-4 first:pt-0 last:pb-0 ${color.inventory > 0 ? "opacity-100" : "opacity-50"}`}>
      <div className="relative h-32 w-full">
        <ProductCover {...product} />
        {color.inventory > 0 && Date.parse(product.offer?.expiresAt) > Date.now() && <div className="absolute right-0 top-4 z-10 flex h-6 w-11 items-center justify-center rounded-full bg-primary-900 font-vazirmatn-medium text-sm text-white">{product.offer.percent}%</div>}
      </div>
      <div>
        <h3 className="h-14 font-vazirmatn-medium text-lg">
          <Link to={`/products/${product._id}`} className="line-clamp-2 transition-colors hover:text-primary-900">{product.title}</Link>
        </h3>
        <div className="mt-2 flex flex-col gap-y-1 text-nowrap text-zinc-500 [&>*]:flex [&>*]:items-center [&>*]:gap-x-2">
          <div>
            <div className="mx-[1.7px] size-5 rounded-full border border-zinc-500" style={{ backgroundColor: color.code }}></div>
            <span>{color.name}</span>
          </div>
          {product.warranty > 0 && (
            <div>
              <ShieldIcon className="size-6 shrink-0" />
              <span>گارانتی {product.warranty} ماهه</span>
            </div>
          )}
        </div>
      </div>
      {color.inventory > 0 && Date.parse(product.offer?.expiresAt) > Date.now() && <AmazingOfferTimer expiresAt={product.offer.expiresAt} width="100%" fontSize="14px" />}
      {color.inventory > 0 ? <ProductButton id={product._id} color={color} disabled={!color.inventory} /> : <button></button>}
      <ProductPrice price={color.price} offer={product.offer} hasInventory={color.inventory} priceFontSize="18px" discountedPriceFontSize="14px" columnGap="2px" iconSize="20px" />
    </div>
  );
};

export default CartProduct;