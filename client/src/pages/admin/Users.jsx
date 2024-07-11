import { useEffect } from "react";
import useUsers from "../../hooks/user/useUsers";
import InfiniteScroll from "../../components/InfiniteScroll";
import User from "../../components/admin/User";
import UserSkeleton from "../../components/admin/UserSkeleton";
import NoResultFound from "../../components/NoResultFound";

const Users = () => {
  const { isFetchingUsers, isUsersError, users, totalUsers, hasUsersNextPage, fetchUsersNextPage } = useUsers(20);

  useEffect(() => {
    document.title = "تکنوشاپ - مدیریت - کاربر ها";
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">کاربر ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingUsers || isUsersError ? 0 : totalUsers.toLocaleString()} کاربر</span>
      </div>
      {isUsersError ? (
        <NoResultFound title="کاربری پیدا نشد!" className="mt-4" />
      ) : (
        <div className="mt-4 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>آواتار</th>
                <th>نام</th>
                <th>نام خانوادگی</th>
                <th>ایمیل</th>
                <th>نقش</th>
                <th>وضعیت</th>
                <th></th>
              </tr>
            </thead>
            <InfiniteScroll hasNextPage={hasUsersNextPage} fetchNextPage={fetchUsersNextPage}>
              <tbody>
                {users?.map((user) => <User key={user._id} {...user} />)}
                {isFetchingUsers && Array(20).fill().map((user, index) => <UserSkeleton key={index} />)}
              </tbody>
            </InfiniteScroll>
          </table>
        </div>
      )}
    </>
  );
};

export default Users;