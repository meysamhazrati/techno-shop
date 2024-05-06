import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useRemoveComment from "../../hooks/comment/remove";
import Loader from "../Loader";
import StarIcon from "../../icons/Star";
import TrashIcon from "../../icons/Trash";

const Comment = ({ _id, body, score, isConfirmed, product, article, createdAt }) => {
  const client = useQueryClient();

  const { isPendingRemoveComment, removeComment } = useRemoveComment(_id);
  
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-x-10 overflow-auto">
        <div className="flex shrink-0 items-center gap-x-3 sm:shrink">
          <Link to={product ? `/products/${product._id}` : `/articles/${article._id}`} className="hidden h-28 w-44 shrink-0 overflow-hidden rounded-3xl xs:block">
            <img src={`${process.env.SERVER_URI}/${product ? `products/${product.covers[0]}` : `articles/${article.cover}`}`} alt={`${product ? "Product" : "Article"} Cover`} loading="lazy" className="size-full object-cover" />
          </Link>
          <div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(createdAt))}</span>
              {isConfirmed && (
                <>
                  <span className="h-4 w-px bg-zinc-200"></span>
                  <span className="rounded-full bg-primary-50 px-3 py-0.5 text-sm text-primary-900">تایید شده</span>
                </>
              )}
            </div>
            <h4 className="mt-2 font-vazirmatn-medium text-lg">
              <Link to={product ? `/products/${product._id}` : `/articles/${article._id}`} className="line-clamp-1 max-w-96 transition-colors hover:text-primary-900 sm:max-w-[564px]">{product ? product.title : article.title}</Link>
            </h4>
            <div className="mt-2 flex [&>*]:size-5">
              {Array(score).fill(0).map((star, index) => <StarIcon key={index} className="text-yellow-400" />)}
              {Array(5 - score).fill(0).map((star, index) => <StarIcon key={index} className="text-zinc-200" />)}
            </div>
          </div>
        </div>
        {isPendingRemoveComment ? (
          <Loader width={"36px"} height={"9px"} color={"#a1a1aa"} />
        ) : (
          <button className="flex size-11 shrink-0 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-100" onClick={() => removeComment(null, { onSuccess: () => client.invalidateQueries({ queryKey: ["me"] }) })}>
            <TrashIcon className="size-6" />
          </button>
        )}
      </div>
      <p className="mt-3 text-lg" dangerouslySetInnerHTML={{ __html: body.replaceAll("\n", "<br />") }}></p>
    </div>
  );
};

export default Comment;