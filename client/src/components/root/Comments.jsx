import { useState, useContext } from "react";
import { Context as ToastContext } from "../../contexts/Toast";
import useMe from "../../hooks/authentication/me";
import useCreateComment from "../../hooks/comment/create";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import InfiniteScroll from "../InfiniteScroll";
import NoResultFound from "../NoResultFound";
import Loader from "../Loader";
import StarIcon from "../../icons/Star";

const Comments = ({ isFetching, isError, hasNextPage, fetchNextPage, id, comments, totalComments, submitFor }) => {
  const [body, setBody] = useState("");
  const [score, setScore] = useState(5);

  const { openToast } = useContext(ToastContext);

  const { isFetchingMe, isMeError } = useMe();
  const { isPendingCreateComment, createComment } = useCreateComment();

  const submit = (event) => {
    event.preventDefault();

    if (isFetchingMe || isMeError) {
      openToast("error", null, "لطفا ابتدا وارد حساب کاربری خود شوید.");
    } else {
      if (/^\w{5,300}$/.test(body.trim())) {
        createComment({ body: body.trim(), score, [submitFor]: id }, {
          onSuccess: () => {
            setBody("");
            setScore(5);
          },
        });
      } else {
        openToast("error", null, "دیدگاه باید بین 5 تا 300 حروف باشد.");
      }
    }
  };

  return !isError && (
    <Section>
      <SectionHeader title="دیدگاه ها" condition={true}>
        <span className="mr-auto text-xl text-zinc-500">{isFetching ? 0 : totalComments} دیدگاه</span>
      </SectionHeader>
      <div className="mt-8 flex flex-col items-start gap-6 lg:flex-row [&>*]:rounded-3xl [&>*]:p-6">
        <div className="relative w-full overflow-hidden bg-white lg:sticky lg:top-[104px] lg:w-[400px] lg:shrink-0">
          {(isFetchingMe || isMeError) && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <h6 className="max-w-52 text-center text-xl">برای ثبت دیدگاه وارد حساب کاربری خود شوید.</h6>
            </div>
          )}
          <div className="flex items-center justify-center gap-x-2">
            {Array(5).fill(0).map((star, index) => (
              <button key={index} className={score >= index + 1 ? "text-yellow-400" : "text-zinc-200"} onClick={() => setScore(index + 1)}>
                <StarIcon className="size-8 transition-all" />
              </button>
            ))}
          </div>
          <form onSubmit={submit}>
            <textarea value={body} className="mt-4 max-h-96 min-h-52 w-full rounded-3xl border border-zinc-200 p-4 text-lg outline-none placeholder:text-zinc-400" placeholder="دیدگاه شما..." onInput={({ target }) => setBody(target.value)} />
            <button type="submit" disabled={isFetchingMe || isMeError} className="mt-3 flex h-12 w-full items-center justify-center rounded-full bg-primary-900 text-lg text-white transition-colors hover:bg-primary-800 disabled:bg-primary-100">
              {isPendingCreateComment ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ثبت دیدگاه"}
            </button>
          </form>
        </div>
        <div className="w-full bg-white lg:min-h-[373px]">
          {comments?.length === 0 ? (
            <NoResultFound title="دیدگاهی پیدا نشد!" />
          ) : (
            <InfiniteScroll hasNextPage={hasNextPage} fetchNextPage={fetchNextPage}>
              <div className="divide-y divide-zinc-200">
                {comments?.map((comment) => (
                  <div key={comment._id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between gap-x-3">
                      <div className="flex items-center gap-x-3">
                        <img src={`http://localhost:3000/users/${comment.sender.avatar}`} alt="User Avatar" className="hidden size-14 rounded-full object-cover xs:block" />
                        <div>
                          <div className="flex items-center gap-x-2">
                            <h5 className="line-clamp-1 text-2xl">{comment.sender.firstName} {comment.sender.lastName}</h5>
                            {comment.isBuyer && <span className="rounded-full bg-primary-50 px-3 py-0.5 text-sm text-primary-900">خریدار</span>}
                          </div>
                          <div className="mt-1 flex [&>*]:size-5">
                            {Array(comment.score).fill(0).map((star, index) => <StarIcon key={index} className="text-yellow-400" />)}
                            {Array(5 - comment.score).fill(0).map((star, index) => <StarIcon key={index} className="text-zinc-200" />)}
                          </div>
                        </div>
                      </div>
                      <span className="text-zinc-400 xs:text-lg">{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(comment.createdAt))}</span>
                    </div>
                    <p className="mt-3 text-lg">{comment.body}</p>
                  </div>
                ))}
                {isFetching && Array(5).fill(0).map((comment, index) => (
                  <div key={index} className="animate-pulse py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between gap-x-3">
                      <div className="flex items-center gap-x-3">
                        <div className="hidden size-14 rounded-full bg-skeleton xs:block"></div>
                        <div>
                          <div className="h-5 w-32 rounded-full bg-skeleton"></div>
                          <div className="mt-2 flex">
                            {Array(5).fill(0).map((star, index) => <StarIcon key={index} className="size-5 text-skeleton" />)}
                          </div>
                        </div>
                      </div>
                      <div className="h-5 w-20 rounded-full bg-skeleton"></div>
                    </div>
                    <div className="mt-3">
                      <div className="h-4 w-full rounded-full bg-skeleton"></div>
                      <div className="mt-2 h-4 w-full rounded-full bg-skeleton"></div>
                      <div className="mt-2 h-4 w-3/5 rounded-full bg-skeleton"></div>
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Comments;