import { useState } from "react";
import { Link } from "react-router-dom";
import usePublishArticle from "../../hooks/article/usePublishArticle";
import useDraftArticle from "../../hooks/article/useDraftArticle";
import useRemoveArticle from "../../hooks/article/useRemoveArticle";
import Modal from "../Modal";
import Confirm from "../Confirm";

const Article = ({ _id, title, cover, isPublished, author, score, category }) => {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const { isPendingPublishArticle, publishArticle } = usePublishArticle(_id);
  const { isPendingDraftArticle, draftArticle } = useDraftArticle(_id);
  const { isPendingRemoveArticle, removeArticle } = useRemoveArticle(_id);

  return (
    <>
      <tr className="border-t border-zinc-200 [&>*]:h-[120px] [&>*]:px-5">
        <td>
          <img src={`${process.env.SERVER_URI}/images/articles/${cover}`} alt="Article Cover" loading="lazy" className="h-24 w-40 rounded-3xl object-cover" />
        </td>
        <td>{title}</td>
        <td>{score} ستاره</td>
        <td>{isPublished ? "منتشر شده" : "پیش‌نویس شده"}</td>
        <td>
          <Link to={`/admin/users/${author._id}`} className="text-primary-900">{author.firstName} {author.lastName}</Link>
        </td>
        <td>{category.title}</td>
        <td>
          <div className="flex items-center justify-center gap-x-2 text-base">
            {isPublished ? <button className="flex h-9 w-24 items-center justify-center rounded-full bg-yellow-400 text-white transition-colors hover:bg-yellow-300" onClick={() => setIsDraftModalOpen(true)}>پیش‌نویس</button> : <button className="flex h-9 w-24 items-center justify-center rounded-full bg-yellow-400 text-white transition-colors hover:bg-yellow-300" onClick={() => setIsPublishModalOpen(true)}>انتشار</button>}
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400" onClick={() => setIsRemoveModalOpen(true)}>حذف</button>
            <Link to={`/admin/articles/${_id}`} className="flex h-9 w-24 items-center justify-center rounded-full bg-primary-900 text-white transition-colors hover:bg-primary-800">مشاهده</Link>
          </div>
        </td>
      </tr>
      {isPublished ? (
        <Modal isOpen={isDraftModalOpen} onClose={() => setIsDraftModalOpen(false)}>
          <Confirm title="این مقاله را پیش‌نویس می‌کنید؟" isPending={isPendingDraftArticle} onCancel={() => setIsDraftModalOpen(false)} onConfirm={() => draftArticle(null, { onSuccess: () => setIsDraftModalOpen(false) })} />
        </Modal>
      ) : (
        <Modal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)}>
          <Confirm title="این مقاله را منتشر می‌کنید؟" isPending={isPendingPublishArticle} onCancel={() => setIsPublishModalOpen(false)} onConfirm={() => publishArticle(null, { onSuccess: () => setIsPublishModalOpen(false) })} />
        </Modal>
      )}
      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)}>
        <Confirm title="این مقاله را حذف می‌کنید؟" isPending={isPendingRemoveArticle} onCancel={() => setIsRemoveModalOpen(false)} onConfirm={() => removeArticle(null, { onSuccess: () => setIsRemoveModalOpen(false) })} />
      </Modal>
    </>
  );
};

export default Article;