import { Link } from "react-router-dom";

const Category = ({ title, englishTitle, logo }) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <Link to={`/categories/${englishTitle.toLowerCase().split(" ").join("-")}`} className="size-32">
        <img src={`http://localhost:3000/categories/${logo}`} alt="Category Logo" className="size-full object-cover" />
      </Link>
      <h1 className="font-vazirmatn-medium text-lg">
        <Link to={`/categories/${englishTitle.toLowerCase().split(" ").join("-")}`}>{title}</Link>
      </h1>
    </div>
  );
};

export default Category;