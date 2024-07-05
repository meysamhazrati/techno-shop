import { useState } from "react";
import { Link } from "react-router-dom";
import useRemoveProduct from "../../hooks/product/useRemoveProduct";
import Modal from "../Modal";
import Confirm from "../Confirm";

const Product = ({ _id, title, covers, score, brand, category }) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const { isPendingRemoveProduct, removeProduct } = useRemoveProduct(_id);

  return (
    <>
      <tr className="border-t border-zinc-200 [&>*]:h-[120px] [&>*]:px-5">
        <td>
          <img src={`${process.env.SERVER_URI}/images/products/${covers[0]}`} alt="Product Cover" loading="lazy" className="h-24 w-40 rounded-3xl object-cover" />
        </td>
        <td>{title}</td>
        <td>{score}</td>
        {brand && <td>{brand.name}</td>}
        {category && <td>{category.title}</td>}
        <td>
          <div className="flex items-center justify-center gap-x-2 text-base">
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400" onClick={() => setIsRemoveModalOpen(true)}>حذف</button>
            <Link to={`/admin/products/${_id}`} className="flex h-9 w-24 items-center justify-center rounded-full bg-primary-900 text-white transition-colors hover:bg-primary-800">مشاهده</Link>
          </div>
        </td>
      </tr>
      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)}>
        <Confirm title="این محصول را حذف می‌کنید؟" isPending={isPendingRemoveProduct} onCancel={() => setIsRemoveModalOpen(false)} onConfirm={() => removeProduct(null, { onSuccess: () => setIsRemoveModalOpen(false) })} />
      </Modal>
    </>
  );
};

export default Product;