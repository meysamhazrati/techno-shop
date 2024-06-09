import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import useProduct from "../../hooks/product/useProduct";
import Section from "../../components/root/Section";
import Breadcrumb from "../../components/root/Breadcrumb";
import ProductSpecifications from "../../components/root/ProductSpecifications";
import ProductButton from "../../components/ProductButton";
import ProductFavoriteButton from "../../components/ProductFavoriteButton";
import ProductPrice from "../../components/ProductPrice";
import Comments from "../../components/root/Comments";
import RelatedProducts from "../../components/root/RelatedProducts";
import AmazingOfferTimer from "../../components/AmazingOfferTimer";
import ChevronIcon from "../../icons/ChevronIcon";
import HeartIcon from "../../icons/HeartIcon";
import StarIcon from "../../icons/StarIcon";
import "swiper/css";

const Product = () => {
  const { id } = useParams();
  const [color, setColor] = useState({});
  const { isFetchingProduct, isProductError, product, hasProductNextPage, fetchProductNextPage } = useProduct(id, 10);

  useEffect(() => {
    document.title = isProductError || isFetchingProduct ? "تکنوشاپ" : `تکنوشاپ - ${product.title}`;

    setColor(product?.colors[0] || {});
  }, [isProductError, isFetchingProduct, product]);

  useEffect(() => {
    if (isProductError) {
      throw Object.assign(new Error("The product was not found."), { status: 404 });
    }
  }, [isProductError]);

  return !isProductError && (
    <>
      <Breadcrumb title={isFetchingProduct ? "در حال بارگذاری" : product.title} route={isFetchingProduct ? "/products" : `/products/${product._id}`} categoryTitle={isFetchingProduct ? "در حال بارگذاری" : product.category.title} categoryRoute={isFetchingProduct ? "/categories" : `/categories/${product.category.englishTitle.toLowerCase().split(" ").join("-")}`} />
      <Section className="flex flex-col gap-6 lg:flex-row">
        {isFetchingProduct ? (
          <>
            <div className="h-96 w-full shrink-0 animate-pulse rounded-3xl bg-skeleton lg:size-96"></div>
            <div className="flex w-full animate-pulse flex-col justify-between">
              <div className="flex flex-col gap-y-6">
                <div className="flex w-full items-center gap-x-4">
                  <div className="size-24 shrink-0 rounded-full bg-skeleton"></div>
                  <div className="w-full">
                    <div className="h-6 rounded-full bg-skeleton"></div>
                    <div className="mt-2 h-6 w-3/5 rounded-full bg-skeleton"></div>
                    <div className="mt-4 h-5 w-32 rounded-full bg-skeleton"></div>
                  </div>
                </div>
                <div className="h-6 w-3/5 rounded-full bg-skeleton"></div>
                <div>
                  <div className="h-6 w-28 rounded-full bg-skeleton"></div>
                  <div className="mt-4 flex items-center gap-x-5">
                    <div className="size-9 rounded-full bg-skeleton outline outline-1 outline-offset-4 outline-skeleton"></div>
                    <div className="size-9 rounded-full bg-skeleton outline outline-1 outline-offset-4 outline-skeleton"></div>
                    <div className="size-9 rounded-full bg-skeleton outline outline-1 outline-offset-4 outline-skeleton"></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-x-5">
                <div className="h-6 w-24 rounded-full bg-skeleton"></div>
                <div className="flex w-full items-center gap-x-5 xs:w-3/5">
                  <HeartIcon className="size-9 shrink-0 fill-skeleton stroke-skeleton" />
                  <div className="h-12 w-full rounded-full bg-skeleton"></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="group relative h-96 w-full shrink-0 overflow-hidden rounded-3xl bg-white lg:w-96">
              {product?.colors[0].inventory !== 0 && Date.parse(product?.offer?.expiresAt) > Date.now() && <div className="absolute right-4 top-4 z-10 flex h-9 w-14 items-center justify-center rounded-full bg-primary-900 font-vazirmatn-medium text-lg text-white">{product?.offer?.percent}%</div>}
              <div className="invisible absolute z-50 hidden size-full items-center justify-between px-4 opacity-0 transition-all group-hover:visible group-hover:opacity-100 lg:flex">
                <button className="swiper-prev-button visible flex size-10 items-center justify-center rounded-full border border-zinc-900 bg-white opacity-100 transition-all disabled:invisible disabled:opacity-0">
                  <ChevronIcon className="size-5" />
                </button>
                <button className="swiper-next-button visible flex size-10 items-center justify-center rounded-full border border-zinc-900 bg-white opacity-100 transition-all disabled:invisible disabled:opacity-0">
                  <ChevronIcon className="size-5 rotate-180" />
                </button>
              </div>
              <Swiper
                slidesPerView={1}
                navigation={{ prevEl: ".swiper-prev-button", nextEl: ".swiper-next-button" }}
                modules={[Navigation]}
                className="h-full"
              >
                {product?.covers.map((cover, index) => (
                  <SwiperSlide key={index}>
                     <img src={`${process.env.SERVER_URI}/images/products/${cover}`} alt="Product Cover" className="size-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex w-full flex-col justify-between">
              <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                  <Link to={`/brands/${product?.brand.englishName.toLowerCase().split(" ").join("-")}`} className="size-24 shrink-0 overflow-hidden rounded-full">
                    <img src={`${process.env.SERVER_URI}/images/brands/${product?.brand.logo}`} alt="Product Brand" className="size-full object-cover" />
                  </Link>
                  <div>
                    <h2 className="line-clamp-2 font-vazirmatn-bold text-2xl/relaxed">{product?.title}</h2>
                    <Link to={isFetchingProduct ? "/categories" : `/categories/${product.category.englishTitle.toLowerCase().split(" ").join("-")}`} className="mt-1 inline-block text-xl transition-colors hover:text-primary-900">{product?.category.title}</Link>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 text-lg">
                  <div className="flex items-center gap-x-1">
                    <StarIcon className="size-4 text-yellow-400" />
                    <span>{product?.score}</span>
                  </div>
                  <div className="size-1.5 rounded-full bg-zinc-400"></div>
                  <span>{product?.totalComments.toLocaleString()} دیدگاه</span>
                  <div className="size-1.5 rounded-full bg-zinc-400"></div>
                  <span>{product?.warranty} ماه گارانتی</span>
                  <div className="size-1.5 rounded-full bg-zinc-400"></div>
                  <span>{product?.colors.reduce((previous, { sales }) => previous + sales, 0) > 10 ? `${Math.pow(10, Math.floor(Math.log10(product?.colors.reduce((previous, { sales }) => previous + sales, 0))))}+` : product?.colors.reduce((previous, { sales }) => previous + sales, 0)} فروش</span>
                </div>
                <div>
                  <span className="text-xl">رنگ: {color?.name}</span>
                  <div className="mt-4 flex items-center gap-x-5">
                    {product?.colors.map((color_) => <div key={color_._id} className={`size-9 cursor-pointer rounded-full ${color?._id === color_._id ? "outline-2 outline-primary-900" : "outline-1 outline-zinc-400"} outline outline-offset-4`} style={{ backgroundColor: color_.code }} onClick={() => setColor(color_)}></div>)}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                {product?.colors[0].inventory !== 0 && Date.parse(product?.offer?.expiresAt) > Date.now() && (
                  <div className="mb-1.5 flex shrink items-center justify-between gap-x-5">
                    <AmazingOfferTimer width="48" fontSize="lg" expiresAt={product?.offer?.expiresAt} />
                  </div>
                )}
                <div className="flex items-center justify-between gap-x-5">
                  <ProductPrice price={color?.price || 0} offer={product?.offer} priceFontSize="xl" discountedPriceFontSize="base" gapX="[2px]" iconSize="5" hasInventory={color?.inventory} />
                  <div className="flex h-14 w-full items-center gap-x-5 xs:w-3/5">
                    <ProductFavoriteButton product={product?._id} />
                    <ProductButton id={product?._id} color={color} disabled={!color?.inventory} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Section>
      <ProductSpecifications isFetching={isFetchingProduct} isError={isProductError} {...product} />
      <Comments isFetching={isFetchingProduct} isError={isProductError} hasNextPage={hasProductNextPage} fetchNextPage={fetchProductNextPage} id={product?._id} comments={product?.comments} totalComments={product?.totalComments} submitFor="product" />
      {!isFetchingProduct && <RelatedProducts categoryTitle={product.category.englishTitle} />}
    </>
  );
};

export default Product;