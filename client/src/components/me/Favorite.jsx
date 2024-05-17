import { Link } from "react-router-dom";
import ProductCover from "../ProductCover";
import ProductButton from "../ProductButton";
import ProductFavoriteButton from "../ProductFavoriteButton";
import ProductPrice from "../ProductPrice";
import AmazingOfferTimer from "../AmazingOfferTimer";

const Favorite = ({ _id, covers, title, colors, offer }) => {
  return (
    <div className="grid grid-cols-[200px_1fr] items-center gap-x-4 overflow-auto py-4 first:pt-0 last:pb-0">
      <div className="relative h-28 w-full">
        <ProductCover id={_id} covers={covers} />
        {colors[0].inventory > 0 && Date.parse(offer?.expiresAt) > Date.now() && <div className="absolute right-0 top-0 z-10 flex h-6 w-11 items-center justify-center rounded-full bg-primary-900 font-vazirmatn-medium text-sm text-white">{offer.percent}%</div>}
      </div>
      <div className="min-w-80">
        <h3 className="font-vazirmatn-medium text-lg">
          <Link to={`/products/${_id}`} className="line-clamp-1 transition-colors hover:text-primary-900">{title}</Link>
        </h3>
        <div className="mt-4 flex items-center justify-between gap-x-4">
          {colors[0].inventory > 0 && Date.parse(offer?.expiresAt) > Date.now() && <AmazingOfferTimer width="40" fontSize="sm" expiresAt={offer.expiresAt} />}
        </div>
        <div className="mt-4 flex items-center justify-between gap-x-4">
          <ProductPrice price={colors[0].price} offer={offer} priceFontSize="lg" discountedPriceFontSize="sm" gapX="[2px]" iconSize="5" hasInventory={colors[0].inventory} />
          <div className="flex w-2/3 items-center gap-x-4">
            <ProductFavoriteButton id={_id} size="8" />
            <ProductButton id={_id} color={colors[0]} disabled={!colors[0].inventory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;