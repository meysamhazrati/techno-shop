import { useEffect } from "react";
import useComments from "../../hooks/comment/useComments";
import InfiniteScroll from "../../components/InfiniteScroll";
import Comment from "../../components/admin/Comment";
import CommentSkeleton from "../../components/admin/CommentSkeleton";
import NoResultFound from "../../components/NoResultFound";

const Comments = () => {
  const { isFetchingComments, isCommentsError, comments, totalComments, hasCommentsNextPage, fetchCommentsNextPage } = useComments(20);

  useEffect(() => {
    document.title = "تکنوشاپ - مدیریت - دیدگاه ها";
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">دیدگاه ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingComments || isCommentsError ? 0 : totalComments.toLocaleString()} دیدگاه</span>
      </div>
      {isCommentsError ? (
        <NoResultFound title="دیدگاهی پیدا نشد!" className="mt-6" />
      ) : (
        <div className="mt-6 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>امتیاز</th>
                <th>وضعیت</th>
                <th>محصول / مقاله</th>
                <th>فرستنده</th>
                <th>تاریخ ثبت</th>
                <th></th>
              </tr>
            </thead>
            <InfiniteScroll hasNextPage={hasCommentsNextPage} fetchNextPage={fetchCommentsNextPage}>
              <tbody>
                {comments?.map((comment) => <Comment key={comment._id} {...comment} />)}
                {isFetchingComments && Array(20).fill().map((comment, index) => <CommentSkeleton key={index} productOrArticleField={true} senderField={true} />)}
              </tbody>
            </InfiniteScroll>
          </table>
        </div>
      )}
    </>
  );
};

export default Comments;