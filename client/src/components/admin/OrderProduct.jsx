import { useState } from "react";
import Modal from "../Modal";

const OrderProduct = ({ quantity, product, color }) => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  return (
    <>
      <tr className="border-t border-zinc-200 [&>*]:h-[120px] [&>*]:px-5">
        <td>
          <img src={`${process.env.SERVER_URI}/images/products/${product.covers[0]}`} alt={product.title} loading="lazy" className="mx-auto h-24 w-40 rounded-3xl object-cover" />
        </td>
        <td>{product.title}</td>
        <td>{quantity} محصول</td>
        <td>{color.name}</td>
        <td>{product.warranty > 0 ? `${product.warranty} ماه` : "ندارد"}</td>
        <td>{product.brand.name}</td>
        <td>{product.category.title}</td>
        <td>{product.offer ? product.offer.title : "ندارد"}</td>
        <td>
          <button className="flex h-9 w-24 items-center justify-center rounded-full bg-primary-900 text-base text-white transition-colors hover:bg-primary-800" onClick={() => setIsProductModalOpen(true)}>مشاهده</button>
        </td>
      </tr>
      <Modal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)}>
        <h6 className="text-center font-vazirmatn-medium text-2xl">محصول</h6>
        <div className="mt-6 flex max-w-80 flex-col gap-3 overflow-auto text-nowrap text-lg">
          {product.length && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">طول:</span>
              <span>{product.length.toLocaleString()} میلی‌متر</span>
            </div>
          )}
          {product.width && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">عرض:</span>
              <span>{product.width.toLocaleString()} میلی‌متر</span>
            </div>
          )}
          {product.height && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">ارتفاع:</span>
              <span>{product.height.toLocaleString()} میلی‌متر</span>
            </div>
          )}
          {product.thickness && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">ضخامت:</span>
              <span>{product.thickness.toLocaleString()} میلی‌متر</span>
            </div>
          )}
          {product.weight && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">وزن:</span>
              <span>{product.weight.toLocaleString()} گرم</span>
            </div>
          )}
          {product.chip && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">تراشه:</span>
              <span>{product.chip}</span>
            </div>
          )}
          {product.motherboard && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">مادربرد:</span>
              <span>{product.motherboard}</span>
            </div>
          )}
          {product.CPU && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">سازنده پردازنده:</span>
              <span>{product.CPU}</span>
            </div>
          )}
          {product.CPUSeries && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">سری پردازنده:</span>
              <span>{product.CPUSeries}</span>
            </div>
          )}
          {product.CPUGeneration && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نسل پردازنده:</span>
              <span>{product.CPUGeneration}</span>
            </div>
          )}
          {product.CPUFrequency && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">فرکانس پردازنده:</span>
              <span>{product.CPUFrequency.toLocaleString()} گیگاهرتز</span>
            </div>
          )}
          {product.CPUCore && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">تعداد هسته پردازنده:</span>
              <span>{product.CPUCore.toLocaleString()} هسته</span>
            </div>
          )}
          {product.GPU && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">سازنده پردازنده گرافیکی:</span>
              <span>{product.GPU}</span>
            </div>
          )}
          {product.GPUModel && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">مدل پردازنده گرافیکی:</span>
              <span>{product.GPUModel}</span>
            </div>
          )}
          {product.GPURAM && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">رم پردازنده گرافیکی:</span>
              <span>{product.GPURAM.toLocaleString()} گیگابایت</span>
            </div>
          )}
          {product.operatingSystem && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">سیستم عامل:</span>
              <span>{product.operatingSystem}</span>
            </div>
          )}
          {product.operatingSystemVersion && product.operatingSystem !== "فاقد سیستم عامل" && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نسخه سیستم عامل:</span>
              <span>{product.operatingSystemVersion.toLocaleString()}</span>
            </div>
          )}
          {product.internalMemory && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">حافظه داخلی:</span>
              <span>{product.internalMemory.toLocaleString()} گیگابایت</span>
            </div>
          )}
          {product.internalMemoryType && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نوع حافظه داخلی:</span>
              <span>{product.internalMemoryType}</span>
            </div>
          )}
          {product.drive && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نوع درایو:</span>
              <span>{product.drive}</span>
            </div>
          )}
          {product.storage && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">ظرفیت:</span>
              <span>{product.storage.toLocaleString()} گیگابایت</span>
            </div>
          )}
          {product.RAM && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">رم:</span>
              <span>{product.RAM.toLocaleString()} گیگابایت</span>
            </div>
          )}
          {product.RAMType && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نوع رم:</span>
              <span>{product.RAMType}</span>
            </div>
          )}
          {product.memoryCard && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">کارت حافظه:</span>
              <span>{product.memoryCard}</span>
            </div>
          )}
          {product.SIMCard && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">تعداد سیم‌کارت:</span>
              <span>{product.SIMCard.toLocaleString()} عدد</span>
            </div>
          )}
          {product.network && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">شبکه ارتباطی:</span>
              <span>{product.network}</span>
            </div>
          )}
          {product.battery && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نوع باطری:</span>
              <span>{product.battery}</span>
            </div>
          )}
          {product.batteryCapacity && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">ظرفیت باطری:</span>
              <span>{product.batteryCapacity.toLocaleString()} میلی‌آمپر</span>
            </div>
          )}
          {product.chargingPort && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">درگاه شارژ:</span>
              <span>{product.chargingPort}</span>
            </div>
          )}
          {product.chargingSpeed && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">سرعت شارژ:</span>
              <span>{product.chargingSpeed.toLocaleString()} وات</span>
            </div>
          )}
          {product.screen && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نوع صفحه نمایش:</span>
              <span>{product.screen}</span>
            </div>
          )}
          {product.screenSize && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">اندازه صفحه نمایش:</span>
              <span>{product.screenSize.toLocaleString()} اینچ</span>
            </div>
          )}
          {product.resolutionWidth && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">عرض رزولوشن:</span>
              <span>{product.resolutionWidth.toLocaleString()} پیکسل</span>
            </div>
          )}
          {product.resolutionHeight && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">ارتفاع رزولوشن:</span>
              <span>{product.resolutionHeight.toLocaleString()} پیکسل</span>
            </div>
          )}
          {product.camera && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">تعداد دوربین:</span>
              <span>{product.camera.toLocaleString()} عدد</span>
            </div>
          )}
          {product.photoResolution && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">رزولوشن عکس:</span>
              <span>{product.photoResolution.toLocaleString()} مگاپیکسل</span>
            </div>
          )}
          {product.videoResolutionWidth && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">عرض رزولوشن ویدئو:</span>
              <span>{product.videoResolutionWidth.toLocaleString()} پیکسل</span>
            </div>
          )}
          {product.videoResolutionHeight && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">ارتفاع رزولوشن ویدئو:</span>
              <span>{product.videoResolutionHeight.toLocaleString()} پیکسل</span>
            </div>
          )}
          {product.videoFPS && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">سرعت ویدئو:</span>
              <span>{product.videoFPS.toLocaleString()} فریم بر ثانیه</span>
            </div>
          )}
          {product.headphoneJack && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">جک هدفون:</span>
              <span>{product.headphoneJack}</span>
            </div>
          )}
          {product.connectionType && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نوع اتصال:</span>
              <span>{product.connectionType}</span>
            </div>
          )}
          {product.interfaces && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">رابط ها:</span>
              <span>{product.interfaces.join(", ")}</span>
            </div>
          )}
          {(product.buttons || product.keys) && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">تعداد کلید:</span>
              <span>{(product.buttons || product.keys).toLocaleString()} عدد</span>
            </div>
          )}
          {product.minimumDPI && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">حداقل دقت:</span>
              <span>{product.minimumDPI.toLocaleString()}</span>
            </div>
          )}
          {product.maximumDPI && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">حداکثر دقت:</span>
              <span>{product.maximumDPI.toLocaleString()}</span>
            </div>
          )}
          {product.minimumResponseTime && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">حداقل زمان پاسخ‌گویی:</span>
              <span>{product.minimumResponseTime.toLocaleString()} میلی‌ثانیه</span>
            </div>
          )}
          {product.maximumResponseTime && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">حداکثر زمان پاسخ‌گویی:</span>
              <span>{product.maximumResponseTime.toLocaleString()} میلی‌ثانیه</span>
            </div>
          )}
          {product.panel && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">پنل:</span>
              <span>{product.panel}</span>
            </div>
          )}
          {product.backlight && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نور پس‌زمینه:</span>
              <span>{product.backlight}</span>
            </div>
          )}
          {product.color && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">تعداد رنگ:</span>
              <span>{product.color.toLocaleString()} رنگ</span>
            </div>
          )}
          {product.impedance && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">امپدانس:</span>
              <span>{product.impedance.toLocaleString()} اهم</span>
            </div>
          )}
          {product.strapMaterial && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">جنس بند:</span>
              <span>{product.strapMaterial}</span>
            </div>
          )}
          {product.hasFingerprintSensor && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">حسگر اثرانگشت:</span>
              <span>{product.hasFingerprintSensor ? "دارد" : "ندارد"}</span>
            </div>
          )}
          {product.hasNoiseCancelling && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">قابلیت Noise Cancelling:</span>
              <span>{product.hasNoiseCancelling ? "دارد" : "ندارد"}</span>
            </div>
          )}
          {product.isWaterproof && (
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">ضد آب:</span>
              <span>{product.isWaterproof ? "هست" : "نیست"}</span>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default OrderProduct;