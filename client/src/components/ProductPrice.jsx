import TomanIcon from "../icons/TomanIcon";

const ProductPrice = ({ price, offer, priceFontSize, discountedPriceFontSize, gapX, iconSize, hasInventory }) => {
  return hasInventory ? (
    <div className="flex flex-col">
      {Date.parse(offer?.expiresAt) > Date.now() && <span className={`text-${discountedPriceFontSize} text-zinc-400 line-through`}>{price.toLocaleString()}</span>}
      <span className={`flex items-center gap-x-${gapX} font-vazirmatn-bold text-${priceFontSize}`}>
        {Date.parse(offer?.expiresAt) > Date.now() ? (price - price * (offer.percent / 100)).toLocaleString() : price.toLocaleString()}
        <TomanIcon className={`size-${iconSize}`} />
      </span>
    </div>
  ) : (
    <span className={`text-${priceFontSize} text-red-700`}>ناموجود</span>
  );
};

export default ProductPrice;