import { useEffect } from "react";
import useAddresses from "../../hooks/address/useAddresses";
import InfiniteScroll from "../../components/InfiniteScroll";
import Address from "../../components/admin/Address";
import AddressSkeleton from "../../components/admin/AddressSkeleton";
import NoResultFound from "../../components/NoResultFound";

const Addresses = () => {
  const { isFetchingAddresses, isAddressesError, addresses, totalAddresses, hasAddressesNextPage, fetchAddressesNextPage } = useAddresses(20);

  useEffect(() => {
    document.title = "تکنوشاپ - مدیریت - آدرس ها";
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">آدرس ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingAddresses || isAddressesError ? 0 : totalAddresses.toLocaleString()} آدرس</span>
      </div>
      {isAddressesError ? (
        <NoResultFound title="آدرسی پیدا نشد!" className="mt-4" />
      ) : (
        <div className="mt-4 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>استان</th>
                <th>شهر</th>
                <th>کدپستی</th>
                <th>گیرنده</th>
                <th></th>
              </tr>
            </thead>
            <InfiniteScroll hasNextPage={hasAddressesNextPage} fetchNextPage={fetchAddressesNextPage}>
              <tbody>
                {addresses?.map((address) => <Address key={address._id} {...address} />)}
                {isFetchingAddresses && Array(20).fill().map((address, index) => <AddressSkeleton key={index} recipientField={true} />)}
              </tbody>
            </InfiniteScroll>
          </table>
        </div>
      )}
    </>
  );
};

export default Addresses;