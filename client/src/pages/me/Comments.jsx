import { useEffect } from "react";
import useMe from "../../hooks/authentication/me";
import Comment from "../../components/me/Comment";
import NoResultFound from "../../components/NoResultFound";

const Comments = () => {
  const { me } = useMe();

  useEffect(() => {
    document.title = "تکنوشاپ - من - دیدگاه ها";
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">دیدگاه ها</h2>
        <span className="mr-auto text-zinc-500">{me.comments.length.toLocaleString()} دیدگاه</span>
      </div>
      {me.comments.length !== 0 ? (
        <div className="mt-4 divide-y divide-zinc-200 overflow-hidden">
          {me.comments.map((comment) => <Comment key={comment._id} {...comment} />)}
        </div>
      ) : (
        <NoResultFound title="دیدگاهی پیدا نشد!" className="mt-4" />
      )}
    </>
  );
};

export default Comments;