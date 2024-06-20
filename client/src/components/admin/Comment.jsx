import { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useConfirmComment from "../../hooks/comment/useConfirmComment";
import useRejectComment from "../../hooks/comment/useRejectComment";
import useRemoveComment from "../../hooks/comment/useRemoveComment";
import Modal from "../Modal";
import Confirm from "../Confirm";

const Comment = ({ _id, body, score, isConfirmed, sender, product, article, createdAt }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const client = useQueryClient();

  const { isPendingConfirmComment, confirmComment } = useConfirmComment(_id);
  const { isPendingRejectComment, rejectComment } = useRejectComment(_id);
  const { isPendingRemoveComment, removeComment } = useRemoveComment(_id);

  return (
    <>
      <tr className="border-t border-zinc-200 [&>*]:h-[72px] [&>*]:px-5">
        <td>{score} امتیاز</td>
        <td>{isConfirmed ? "تایید شده" : "رد شده"}</td>
        <td>
          <Link to={product ? `/admin/products/${product._id}` : `/admin/articles/${article._id}`} className="text-primary-900">{product ? product.title : article.title}</Link>
        </td>
        {sender.firstName && sender.lastName && (
          <td>
            <Link to={`/admin/users/${sender._id}`} className="text-primary-900">{sender.firstName} {sender.lastName}</Link>
          </td>
        )}
        <td>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(createdAt))}</td>
        <td>
          <div className="flex items-center justify-center gap-x-2 text-base">
            {isConfirmed ? <button className="flex h-9 w-24 items-center justify-center rounded-full bg-yellow-400 text-white transition-colors hover:bg-yellow-300" onClick={() => setIsRejectModalOpen(true)}>رد</button> : <button className="flex h-9 w-24 items-center justify-center rounded-full bg-yellow-400 text-white transition-colors hover:bg-yellow-300" onClick={() => setIsConfirmModalOpen(true)}>تایید</button>}
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400" onClick={() => setIsRemoveModalOpen(true)}>حذف</button>
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-primary-900 text-white transition-colors hover:bg-primary-800" onClick={() => setIsCommentModalOpen(true)}>مشاهده</button>
          </div>
        </td>
      </tr>
      {isConfirmed ? (
        <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)}>
          <Confirm title="این دیدگاه را رد می‌کنید؟" isPending={isPendingRejectComment} onCancel={() => setIsRejectModalOpen(false)} onConfirm={() =>
            rejectComment(null, { onSuccess: () => {
              client.invalidateQueries({ queryKey: ["users", { id: sender._id || sender }] });
              setIsRejectModalOpen(false);
          } })} />
        </Modal>
      ) : (
        <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
          <Confirm title="این دیدگاه را تایید می‌کنید؟" isPending={isPendingConfirmComment} onCancel={() => setIsConfirmModalOpen(false)} onConfirm={() =>
            confirmComment(null, { onSuccess: () => {
              client.invalidateQueries({ queryKey: ["users", { id: sender._id || sender }] });
              setIsConfirmModalOpen(false);
          } })} />
        </Modal>
      )}
      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)}>
        <Confirm title="این دیدگاه را حذف می‌کنید؟" isPending={isPendingRemoveComment} onCancel={() => setIsRemoveModalOpen(false)} onConfirm={() =>
          removeComment(null, { onSuccess: () => {
            client.invalidateQueries([{ queryKey: ["comments"] }, { queryKey: ["users", { id: sender._id || sender }] }]);
            setIsRemoveModalOpen(false);
        } })} />
      </Modal>
      <Modal isOpen={isCommentModalOpen} onClose={() => setIsCommentModalOpen(false)}>
        <h6 className="text-center font-vazirmatn-medium text-2xl">دیدگاه</h6>
        <p className="mt-6 min-w-64 max-w-80 text-lg" dangerouslySetInnerHTML={{ __html: body.replaceAll("\n", "<br />") }}></p>
      </Modal>
    </>
  );
};

export default Comment;