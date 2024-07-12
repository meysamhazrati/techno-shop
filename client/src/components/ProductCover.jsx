import { Link } from "react-router-dom";

const ProductCover = ({ id, title, covers }) => {
  return (
    <Link to={`/products/${id}`} className="relative block size-full [&>img]:absolute [&>img]:size-full [&>img]:object-cover">
      <img src={`${process.env.SERVER_URI}/images/products/${covers[1]}`} alt={title} loading="lazy" />
      <img src={`${process.env.SERVER_URI}/images/products/${covers[0]}`} alt={title} loading="lazy" className="transition-opacity duration-300 hover:opacity-0" />
    </Link>
  );
};

export default ProductCover;