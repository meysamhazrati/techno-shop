import { Link } from "react-router-dom";

const Brand = ({ englishName, logo }) => {
  return (
    <Link to={`/brands/${englishName.toLowerCase().split(" ").join("-")}`} className="size-32 overflow-hidden rounded-full">
      <img src={`http://localhost:3000/brands/${logo}`} alt="Brand Logo" loading="lazy" className="size-full object-cover" />
    </Link>
  );
};

export default Brand;