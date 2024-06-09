import { Link } from "react-router-dom";
import ProductCover from "../ProductCover";
import ProductButton from "../ProductButton";
import ProductPrice from "../ProductPrice";
import SquaresIcon from "../../icons/SquaresIcon";
import StarIcon from "../../icons/StarIcon";

const Product = ({ _id, covers, title, colors, score, category, offer }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white">
      <div className="h-48 w-full">
        <ProductCover id={_id} covers={covers} />
        {colors[0].inventory > 0 && Date.parse(offer?.expiresAt) > Date.now() && <div className="absolute right-4 top-4 z-10 flex h-7 w-12 items-center justify-center rounded-full bg-primary-900 font-vazirmatn-medium text-white">{offer.percent}%</div>}
      </div>
      <div className="p-4">
        <h3 className="h-16 font-vazirmatn-medium text-xl/relaxed">
          <Link to={`/products/${_id}`} className="line-clamp-2 transition-colors hover:text-primary-900">{title}</Link>
        </h3>
        <div className="my-4 flex items-center justify-between gap-x-5">
          <div className="flex items-center gap-x-1 transition-colors hover:text-primary-900">
            <SquaresIcon className="size-5" />
            <Link to={`/categories/${category.englishTitle.toLowerCase().split(" ").join("-")}`}>{category.title}</Link>
          </div>
          <div className="flex items-center gap-x-1 text-yellow-400">
            <span className="font-vazirmatn-bold text-lg">{score}</span>
            <StarIcon className="size-5" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-5 border-t border-zinc-200 pt-4">
          <ProductButton id={_id} color={colors[0]} disabled={!colors[0].inventory} />
          <ProductPrice price={colors[0].price} offer={offer} priceFontSize="lg" discountedPriceFontSize="sm" gapX="[2px]" iconSize="5" hasInventory={colors[0].inventory} />
        </div>
      </div>
    </div>
  );
};

export default Product;