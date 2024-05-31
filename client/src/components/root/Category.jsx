import { Link } from "react-router-dom";

const Category = ({ title, englishTitle, logo }) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <Link to={`/categories/${englishTitle.toLowerCase().split(" ").join("-")}`} className="size-32 overflow-hidden rounded-full">
        <img src={`${process.env.SERVER_URI}/images/categories/${logo}`} alt="Category Logo" loading="lazy" className="size-full object-cover" />
      </Link>
      <h1 className="font-vazirmatn-medium text-lg">
        <Link to={`/categories/${englishTitle.toLowerCase().split(" ").join("-")}`} className="line-clamp-1">{title}</Link>
      </h1>
    </div>
  );
};

export default Category;