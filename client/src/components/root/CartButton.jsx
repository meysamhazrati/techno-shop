import { Link } from "react-router-dom";
import useMe from "../../hooks/authentication/me";
import CartProduct from "../CartProduct";
import CartIcon from "../../icons/Cart";
import TomanIcon from "../../icons/Toman";

const CartButton = () => {
  const { isMeError, me } = useMe();

  return (
    <div className="group relative size-12 rounded-full transition-colors hover:bg-zinc-200">
      <Link to={isMeError ? "/authentication/login" : "/me/cart"} className="flex size-full items-center justify-center rounded-full">
        <CartIcon className="size-7 transition-colors group-hover:stroke-zinc-700" />
      </Link>
      {me?.cart.length > 0 && (
        <>
          <div className="pointer-events-none absolute right-1 top-1 flex size-5 items-center justify-center rounded-full border-[2px] border-white bg-primary-900 text-xs text-white transition-colors group-hover:border-zinc-200">{me.cart.length}</div>
          {window.innerWidth > 1024 && (
            <div className="invisible absolute left-0 top-auto rounded-3xl border-b-4 border-primary-900 bg-white p-3 opacity-0 shadow transition-all group-hover:visible group-hover:opacity-100">
              <span className="text-zinc-400">{me.cart.length} کالا</span>
              <div className="max-h-80 w-[350px] divide-y divide-zinc-200 overflow-auto">
                {me?.cart.map((product) => <CartProduct key={product._id} {...product} />)}
              </div>
              <div className="flex w-full items-center justify-between border-t border-zinc-200 pt-3">
                <div>
                  <span className="block text-xs text-zinc-500">مبلغ قابل پرداخت</span>
                  <span className="flex items-center gap-x-[2px] font-vazirmatn-bold text-xl">
                    {me.cart.reduce((previous, { quantity, product, color }) => previous + quantity * (Date.parse(product.offer?.expiresAt) > Date.now() ? color.price - color.price * (product.offer.percent / 100) : color.price), 0).toLocaleString()}
                    <TomanIcon className="size-5" />
                  </span>
                </div>
                <Link to="/me/cart" className="rounded-full bg-primary-900 px-5 py-3 font-vazirmatn-medium text-white transition-colors hover:bg-primary-800">ثبت سفارش</Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartButton;