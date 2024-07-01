import { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateComment from "../../hooks/comment/useUpdateComment";
import useRemoveComment from "../../hooks/comment/useRemoveComment";
import Modal from "../Modal";
import Confirm from "../Confirm";
import Loader from "../Loader";
import StarIcon from "../../icons/StarIcon";
import PencilIcon from "../../icons/PencilIcon";
import TrashIcon from "../../icons/TrashIcon";

const Comment = ({ _id, body, score, isConfirmed, product, article, createdAt }) => {
  const [newBody, setNewBody] = useState(body);
  const [newScore, setNewScore] = useState(score);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const client = useQueryClient();

  const { isPendingUpdateComment, updateComment } = useUpdateComment(_id);
  const { isPendingRemoveComment, removeComment } = useRemoveComment(_id);

  return (
    <>
      <div className="py-4 first:pt-0 last:pb-0">
        <div className="flex items-center justify-between gap-x-10 overflow-auto">
          <div className="flex shrink-0 items-center gap-x-3 sm:shrink">
            <Link to={product ? `/products/${product._id}` : `/articles/${article._id}`} className="h-28 w-44 shrink-0 overflow-hidden rounded-3xl">
              <img src={`${process.env.SERVER_URI}/images/${product ? `products/${product.covers[0]}` : `articles/${article.cover}`}`} alt={`${product ? "Product" : "Article"} Cover`} loading="lazy" className="size-full object-cover" />
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
                {Array(score).fill().map((star, index) => <StarIcon key={index} className="text-yellow-400" />)}
                {Array(5 - score).fill().map((star, index) => <StarIcon key={index} className="text-zinc-200" />)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <button className="flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={() => setIsEditModalOpen(true)}>
              <PencilIcon className="size-6" />
            </button>
            <button className="flex size-11 shrink-0 items-center justify-center rounded-full text-red-500 transition-colors enabled:hover:bg-red-100" onClick={() => setIsRemoveModalOpen(true)}>
              <TrashIcon className="size-6" />
            </button>
          </div>
        </div>
        <p className="mt-3 text-lg" dangerouslySetInnerHTML={{ __html: body.replaceAll("\n", "<br />") }}></p>
      </div>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h6 className="text-center font-vazirmatn-medium text-2xl">ویرایش دیدگاه</h6>
        <form className="mt-6 flex flex-col gap-y-3 text-lg xs:w-80 [&>*]:w-full" onSubmit={(event) => {
          event.preventDefault();

          updateComment({ body: newBody.trim(), score: newScore }, { onSuccess: () => {
            client.invalidateQueries({ queryKey: ["me"] });
            setIsEditModalOpen(false);
          } });
        }}>
          <div className="flex items-center justify-center gap-x-2">
            {Array(5).fill().map((star, index) => (
              <button type="button" key={index} className={newScore >= index + 1 ? "text-yellow-400" : "text-zinc-200"} onClick={() => setNewScore(index + 1)}>
                <StarIcon className="size-8 transition-all" />
              </button>
            ))}
          </div>
          <textarea
            value={newBody}
            placeholder="متن"
            className="max-h-48 min-h-32 rounded-3xl border border-zinc-200 p-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewBody(target.value)}
           />
          <button disabled={isPendingUpdateComment} className="flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
            {isPendingUpdateComment ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ویرایش"}
          </button>
        </form>
      </Modal>
      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)}>
        <Confirm title="این دیدگاه را حذف می‌کنید؟" isPending={isPendingRemoveComment} onCancel={() => setIsRemoveModalOpen(false)} onConfirm={() => removeComment(null, { onSuccess: () => {
          client.invalidateQueries({ queryKey: ["me"] });
          setIsRemoveModalOpen(false);
        } })} />
      </Modal>
    </>
  );
};

export default Comment;