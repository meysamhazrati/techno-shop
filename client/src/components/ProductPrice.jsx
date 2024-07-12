import TomanIcon from "../icons/TomanIcon";

const ProductPrice = ({ price, offer, hasInventory, priceFontSize, discountedPriceFontSize, columnGap, iconSize }) => {
  return hasInventory ? (
    <div className="flex flex-col">
      {Date.parse(offer?.expiresAt) > Date.now() && <span className="text-zinc-400 line-through" style={{ fontSize: discountedPriceFontSize }}>{price.toLocaleString()}</span>}
      <span className="flex items-center font-vazirmatn-bold" style={{ fontSize: priceFontSize, columnGap }}>
        {Date.parse(offer?.expiresAt) > Date.now() ? (price - price * (offer.percent / 100)).toLocaleString() : price.toLocaleString()}
        <TomanIcon className={iconSize === "16px" ? "size-4" : "size-5"} />
      </span>
    </div>
  ) : (
    <span className="text-red-700" style={{ fontSize: priceFontSize }}>ناموجود</span>
  );
};

export default ProductPrice;