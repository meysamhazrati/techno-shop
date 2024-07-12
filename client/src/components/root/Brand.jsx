import { Link } from "react-router-dom";

const Brand = ({ name, englishName, logo }) => {
  return (
    <Link to={`/brands/${englishName.toLowerCase().split(" ").join("-")}`} className="size-32 overflow-hidden rounded-full">
      <img src={`${process.env.SERVER_URI}/images/brands/${logo}`} alt={name} loading="lazy" className="size-full object-cover" />
    </Link>
  );
};

export default Brand;