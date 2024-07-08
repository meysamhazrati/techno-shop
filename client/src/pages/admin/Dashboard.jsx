import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ResponsiveContainer, AreaChart, CartesianGrid, YAxis, XAxis, Tooltip, Area } from "recharts";
import useStatistics from "../../hooks/statistic/useStatistics";
import ChevronIcon from "../../icons/ChevronIcon";
import CashIcon from "../../icons/CashIcon";
import InboxesIcon from "../../icons/InboxesIcon";
import UserIcon from "../../icons/UserIcon";
import MapIcon from "../../icons/MapIcon";
import VerifiedIcon from "../../icons/VerifiedIcon";
import SquaresIcon from "../../icons/SquaresIcon";
import BoxIcon from "../../icons/BoxIcon";
import BagIcon from "../../icons/BagIcon";
import BookIcon from "../../icons/BookIcon";
import CommentIcon from "../../icons/CommentIcon";
import TicketIcon from "../../icons/TicketIcon";
import TagIcon from "../../icons/TagIcon";
import GiftIcon from "../../icons/GiftIcon";
import "swiper/css";

const Dashboard = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const { isFetchingStatistics, isStatisticsError, statistics } = useStatistics();

  useEffect(() => {
    document.title = "تکنوشاپ - مدیریت";
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-zinc-200 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-zinc-100">
            <InboxesIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">فروش کل</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{isFetchingStatistics ? "در حال بارگذاری" : `${statistics.totalSales.toLocaleString()} عدد`}</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-zinc-200 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-zinc-100">
            <CashIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">درآمد کل</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{isFetchingStatistics ? "در حال بارگذاری" : `${statistics.totalRevenue.toLocaleString()} تومان`}</h6>
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 items-center gap-3 text-white xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <UserIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">کاربر ها</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{isFetchingStatistics ? "در حال بارگذاری" : `${statistics.totalUsers.toLocaleString()} کاربر`}</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <MapIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">آدرس ها</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{isFetchingStatistics ? "در حال بارگذاری" : `${statistics.totalAddresses.toLocaleString()} آدرس`}</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <VerifiedIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">برند ها</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{isFetchingStatistics ? "در حال بارگذاری" : `${statistics.totalBrands.toLocaleString()} برند`}</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <SquaresIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">دسته‌بندی ها</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{isFetchingStatistics ? "در حال بارگذاری" : `${statistics.totalCategories.toLocaleString()} دسته‌بندی`}</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <BoxIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">محصول ها</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{isFetchingStatistics ? "در حال بارگذاری" : `${statistics.totalProducts.toLocaleString()} محصول`}</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <BagIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">سفارش ها</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{isFetchingStatistics ? "در حال بارگذاری" : `${statistics.totalOrders.toLocaleString()} سفارش`}</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <BookIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">مقاله ها</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{isFetchingStatistics ? "در حال بارگذاری" : `${statistics.totalArticles.toLocaleString()} مقاله`}</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <CommentIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">دیدگاه ها</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{isFetchingStatistics ? "در حال بارگذاری" : `${statistics.totalComments.toLocaleString()} دیدگاه`}</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <TicketIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">تیکت ها</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{isFetchingStatistics ? "در حال بارگذاری" : `${statistics.totalTickets.toLocaleString()} تیکت`}</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <TagIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">پیشنهاد ها</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{isFetchingStatistics ? "در حال بارگذاری" : `${statistics.totalOffers.toLocaleString()} پیشنهاد`}</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <GiftIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">کد‌تخفیف ها</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{isFetchingStatistics ? "در حال بارگذاری" : `${statistics.totalDiscountCodes.toLocaleString()} کد‌تخفیف`}</h6>
          </div>
        </div>
      </div>
      {!isFetchingStatistics && !isStatisticsError && Object.keys(statistics.yearly).length !== 0 && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="flex items-center gap-x-1 font-vazirmatn-bold text-xl">
              آمار فروش و درآمد در سال
              <span className="text-primary-900">{Object.entries(statistics.yearly).toReversed()[currentSlideIndex][0]}</span>
            </h3>
            {Object.keys(statistics.yearly).length >= 2 && (
              <div className="mr-auto flex items-center gap-x-2 text-primary-900">
                <button className="swiper-button-prev flex size-11 items-center justify-center rounded-full border border-primary-900 transition-colors enabled:hover:bg-primary-50">
                  <ChevronIcon className="size-5" />
                </button>
                <button className="swiper-button-next flex size-11 items-center justify-center rounded-full border border-primary-900 transition-colors enabled:hover:bg-primary-50">
                  <ChevronIcon className="size-5 rotate-180" />
                </button>
              </div>
            )}
          </div>
          <Swiper
            slidesPerView={1}
            onSlideChange={({ activeIndex }) => setCurrentSlideIndex(activeIndex)}
            navigation={{ prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }}
            modules={[Navigation]}
            className="mt-4"
          >
            {Object.entries(statistics.yearly).toReversed().map((year, index) => (
                <SwiperSlide key={index} className="h-96 w-full text-lg">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={year[1]} style={{ cursor: "crosshair" }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <YAxis yAxisId="1" orientation="right" tickMargin="15" allowDecimals={false} />
                      <YAxis yAxisId="2" orientation="left" tickMargin="15" allowDecimals={false} />
                      <XAxis dataKey="month" tickMargin="10" />
                      <Tooltip
                        formatter={(value, name) => name === "totalSales" ? [`${value.toLocaleString()} عدد`, "فروش"] : [`${value.toLocaleString()} تومان`, "درآمد"]}
                        contentStyle={{ padding: "16px", border: "none", borderRadius: "24px", boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }}
                        labelStyle={{ marginBottom: "8px", fontFamily: "vazirmatn-medium" }}
                      />
                      <Area type="monotone" dataKey="totalSales" yAxisId="1" stroke="#a1a1aa" fill="#71717a" />
                      <Area type="monotone" dataKey="totalRevenue" yAxisId="2" stroke="#0279d9" fill="#248bde" />
                    </AreaChart>
                  </ResponsiveContainer>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Dashboard;