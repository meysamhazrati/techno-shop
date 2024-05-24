import { useEffect } from "react";
import useMe from "../../hooks/authentication/me";
import Comment from "../../components/me/Comment";
import NoResultFound from "../../components/NoResultFound";

const Comments = () => {
  const { me } = useMe();

  useEffect(() => {
    document.title = "تکنوشاپ - من - دیدگاه ها";
  }, []);

  return me.comments.length !== 0 ? (
    <>
      <span className="text-lg text-zinc-400">{me.comments.length.toLocaleString()} دیدگاه</span>
      <div className="mt-4 divide-y divide-zinc-200 overflow-hidden">
        {me.comments.map((comment) => <Comment key={comment._id} {...comment} />)}
      </div>
    </>
  ) : (
    <NoResultFound title="دیدگاهی پیدا نشد!" />
  );
};

export default Comments;