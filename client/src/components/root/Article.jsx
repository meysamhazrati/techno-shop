import { Link } from "react-router-dom";
import UserIcon from "../../icons/User";
import StarIcon from "../../icons/Star";
import ChevronIcon from "../../icons/Chevron";

const Article = ({ _id, cover, title, author, score }) => {
  return (
    <div className="overflow-hidden rounded-3xl bg-white">
      <Link to={`/articles/${_id}`} className="block h-48 w-full">
        <img src={`${process.env.SERVER_URI}/articles/${cover}`} alt="Article Cover" loading="lazy" className="size-full object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="h-16 font-vazirmatn-medium text-xl/relaxed">
          <Link to={`/articles/${_id}`} className="line-clamp-2 transition-colors hover:text-primary-900">{title}</Link>
        </h3>
        <div className="my-4 flex items-center justify-between gap-x-5">
          <div className="flex items-center gap-x-1">
            <UserIcon className="size-5" />
            <span>{author.firstName} {author.lastName}</span>
          </div>
          <div className="flex items-center gap-x-1 text-yellow-400">
            <span className="font-vazirmatn-bold text-lg">{score}</span>
            <StarIcon className="size-5" />
          </div>
        </div>
        <div className="flex justify-center border-t border-zinc-200 pt-4">
          <Link to={`/articles/${_id}`} className="inline-flex items-center gap-x-1 transition-colors hover:text-primary-900">
            <span className="text-lg">مطالعه</span>
            <ChevronIcon className="size-5 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;