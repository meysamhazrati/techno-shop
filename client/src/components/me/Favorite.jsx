import { Link } from "react-router-dom";
import ProductCover from "../ProductCover";
import ProductButton from "../ProductButton";
import ProductFavoriteButton from "../ProductFavoriteButton";
import ProductPrice from "../ProductPrice";
import AmazingOfferTimer from "../AmazingOfferTimer";

const Favorite = ({ product }) => {
  return (
    <div className="grid grid-cols-[200px_1fr] items-center gap-x-4 overflow-auto py-4 first:pt-0 last:pb-0">
      <div className="relative h-32 w-full">
        <ProductCover {...product} />
        {product.colors[0].inventory > 0 && Date.parse(product.offer?.expiresAt) > Date.now() && <div className="absolute right-0 top-0 z-10 flex h-6 w-11 items-center justify-center rounded-full bg-primary-900 font-vazirmatn-medium text-sm text-white">{product.offer.percent}%</div>}
      </div>
      <div className="min-w-80">
        <h3 className="font-vazirmatn-medium text-lg">
          <Link to={`/products/${product._id}`} className="line-clamp-1 transition-colors hover:text-primary-900">{product.title}</Link>
        </h3>
        <div className="mt-4 flex items-center justify-between gap-x-4">
          {product.colors[0].inventory > 0 && Date.parse(product.offer?.expiresAt) > Date.now() && <AmazingOfferTimer expiresAt={product.offer.expiresAt} width="160px" fontSize="14px" />}
        </div>
        <div className="mt-4 flex items-center justify-between gap-x-4">
          <ProductPrice price={product.colors[0].price} offer={product.offer} hasInventory={product.colors[0].inventory} priceFontSize="18px" discountedPriceFontSize="14px" columnGap="2px" iconSize="20px" />
          <div className="flex w-full items-center gap-x-4 سئ:w-2/3">
            <ProductFavoriteButton product={product._id} />
            <ProductButton id={product._id} color={product.colors[0]} disabled={!product.colors[0].inventory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;