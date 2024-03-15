import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMe from "../../hooks/authentication/me";
import ProductButton from "../ProductButton";
import SquaresIcon from "../../icons/Squares";
import StarIcon from "../../icons/Star";
import TomanIcon from "../../icons/Toman";

const Product = ({ _id, title, covers, score, colors, category, offer }) => {
  const [quantity, setQuantity] = useState(0);

  const { me } = useMe();

  useEffect(() => {
    const isExists = me?.cart.find(({ product, color }) => _id === product._id && colors[0]._id === color._id);

    setQuantity(isExists ? isExists.quantity : 0);
  }, [_id, colors, me?.cart]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-200">
      {Date.parse(offer?.expiresAt) > Date.now() && <div className="absolute right-4 top-4 z-10 flex h-7 w-12 items-center justify-center rounded-full bg-primary-900 font-vazirmatn-medium text-white">{offer.percent}%</div>}
      <Link to={`/products/${_id}`} className="relative block h-48 w-full [&>img]:absolute [&>img]:size-full [&>img]:object-cover">
        <img src={`http://localhost:3000/products/${covers[1]}`} alt="Product Cover" loading="lazy" />
        <img src={`http://localhost:3000/products/${covers[0]}`} alt="Product Cover" loading="lazy" className="transition-opacity duration-300 hover:opacity-0" />
      </Link>
      <div className="p-4">
        <h3 className="h-16 font-vazirmatn-medium text-xl/relaxed">
          <Link to={`/products/${_id}`} className="line-clamp-2 transition-colors hover:text-primary-900">{title}</Link>
        </h3>
        <div className="my-4 flex items-center justify-between">
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
          <ProductButton id={_id} quantity={quantity} color={colors[0]} />
          <div className="flex flex-col">
            {Date.parse(offer?.expiresAt) > Date.now() && <span className="text-sm text-zinc-400 line-through">{colors[0].price.toLocaleString()}</span>}
            <span className="flex items-center gap-x-[2px] font-vazirmatn-bold text-lg">
              {Date.parse(offer?.expiresAt) > Date.now() ? (colors[0].price - colors[0].price * (offer.percent / 100)).toLocaleString() : colors[0].price.toLocaleString()}
              <TomanIcon className="size-[18px]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;