import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../hooks/product/useProduct";
import useUpdateProduct from "../../hooks/product/useUpdateProduct";
import useBrands from "../../hooks/brand/useBrands";
import useCategories from "../../hooks/category/useCategories";
import InfiniteScroll from "../../components/InfiniteScroll";
import Comment from "../../components/admin/Comment";
import CommentSkeleton from "../../components/admin/CommentSkeleton";
import SelectBox from "../../components/SelectBox";
import NoResultFound from "../../components/NoResultFound";
import Loader from "../../components/Loader";
import TrashIcon from "../../icons/TrashIcon";
import PlusIcon from "../../icons/PlusIcon";

const Product = () => {
  const { id } = useParams();

  const [newTitle, setNewTitle] = useState("");
  const [newWarranty, setNewWarranty] = useState("");
  const [newColors, setNewColors] = useState([]);
  const [newBrand, setNewBrand] = useState(null);
  const [newCategory, setNewCategory] = useState(null);
  const [newLength, setNewLength] = useState("");
  const [newWidth, setNewWidth] = useState("");
  const [newHeight, setNewHeight] = useState("");
  const [newThickness, setNewThickness] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newChip, setNewChip] = useState("");
  const [newMotherboard, setNewMotherboard] = useState("");
  const [newCPU, setNewCPU] = useState(null);
  const [newCPUSeries, setNewCPUSeries] = useState("");
  const [newCPUGeneration, setNewCPUGeneration] = useState("");
  const [newCPUFrequency, setNewCPUFrequency] = useState("");
  const [newCPUCore, setNewCPUCore] = useState("");
  const [newGPU, setNewGPU] = useState(null);
  const [newGPUModel, setNewGPUModel] = useState("");
  const [newGPURAM, setNewGPURAM] = useState("");
  const [newOperatingSystem, setNewOperatingSystem] = useState(null);
  const [newOperatingSystemVersion, setNewOperatingSystemVersion] = useState("");
  const [newInternalMemory, setNewInternalMemory] = useState(null);
  const [newInternalMemoryType, setNewInternalMemoryType] = useState(null);
  const [newDrive, setNewDrive] = useState(null);
  const [newStorage, setNewStorage] = useState(null);
  const [newRAM, setNewRAM] = useState("");
  const [newRAMType, setNewRAMType] = useState(null);
  const [newMemoryCard, setNewMemoryCard] = useState(null);
  const [newSIMCard, setNewSIMCard] = useState(null);
  const [newNetwork, setNewNetwork] = useState(null);
  const [newBattery, setNewBattery] = useState("");
  const [newBatteryCapacity, setNewBatteryCapacity] = useState("");
  const [newChargingPort, setNewChargingPort] = useState(null);
  const [newChargingSpeed, setNewChargingSpeed] = useState("");
  const [newScreen, setNewScreen] = useState("");
  const [newScreenSize, setNewScreenSize] = useState("");
  const [newResolutionWidth, setNewResolutionWidth] = useState("");
  const [newResolutionHeight, setNewResolutionHeight] = useState("");
  const [newCamera, setNewCamera] = useState("");
  const [newPhotoResolution, setNewPhotoResolution] = useState("");
  const [newVideoResolutionWidth, setNewVideoResolutionWidth] = useState("");
  const [newVideoResolutionHeight, setNewVideoResolutionHeight] = useState("");
  const [newVideoFPS, setNewVideoFPS] = useState("");
  const [newHeadphoneJack, setNewHeadphoneJack] = useState(null);
  const [newConnectionType, setNewConnectionType] = useState(null);
  const [newInterfaces, setNewInterfaces] = useState([]);
  const [newButtons, setNewButtons] = useState("");
  const [newKeys, setNewKeys] = useState("");
  const [newMinimumDPI, setNewMinimumDPI] = useState("");
  const [newMaximumDPI, setNewMaximumDPI] = useState("");
  const [newMinimumResponseTime, setNewMinimumResponseTime] = useState("");
  const [newMaximumResponseTime, setNewMaximumResponseTime] = useState("");
  const [newPanel, setNewPanel] = useState("");
  const [newBacklight, setNewBacklight] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newImpedance, setNewImpedance] = useState("");
  const [newStrapMaterial, setNewStrapMaterial] = useState("");
  const [newHasFingerprintSensor, setNewHasFingerprintSensor] = useState(null);
  const [newHasNoiseCancelling, setNewHasNoiseCancelling] = useState(null);
  const [newIsWaterproof, setNewIsWaterproof] = useState(null);

  const { isFetchingProduct, isProductError, product, hasProductNextPage, fetchProductNextPage } = useProduct(id, false, 20);
  const { isPendingUpdateProduct, updateProduct } = useUpdateProduct(id, product?.__t);
  const { brands } = useBrands();
  const { categories } = useCategories();

  useEffect(() => {
    document.title = isFetchingProduct || isProductError ? "تکنوشاپ - مدیریت" : `تکنوشاپ - مدیریت - محصول ها - ${product.title}`;

    if (!isFetchingProduct && !isProductError) {
      setNewTitle(product.title);
      setNewWarranty(product.warranty);
      setNewColors(product.colors);
      setNewBrand(product.brand._id);
      setNewCategory(product.category._id);
      setNewLength(product.length);
      setNewWidth(product.width);
      setNewHeight(product.height);
      setNewThickness(product.thickness);
      setNewWeight(product.weight);
      setNewChip(product.chip);
      setNewMotherboard(product.motherboard);
      setNewCPU(product.CPU);
      setNewCPUSeries(product.CPUSeries);
      setNewCPUGeneration(product.CPUGeneration);
      setNewCPUFrequency(product.CPUFrequency);
      setNewCPUCore(product.CPUCore);
      setNewGPU(product.GPU);
      setNewGPUModel(product.GPUModel);
      setNewGPURAM(product.GPURAM);
      setNewOperatingSystem(product.operatingSystem);
      setNewOperatingSystemVersion(product.operatingSystemVersion);
      setNewInternalMemory(product.internalMemory);
      setNewInternalMemoryType(product.internalMemoryType);
      setNewDrive(product.drive);
      setNewStorage(product.storage);
      setNewRAM(product.RAM);
      setNewRAMType(product.RAMType);
      setNewMemoryCard(product.memoryCard);
      setNewSIMCard(product.SIMCard);
      setNewNetwork(product.network);
      setNewBattery(product.battery);
      setNewBatteryCapacity(product.batteryCapacity);
      setNewChargingPort(product.chargingPort);
      setNewChargingSpeed(product.chargingSpeed);
      setNewScreen(product.screen);
      setNewScreenSize(product.screenSize);
      setNewResolutionWidth(product.resolutionWidth);
      setNewResolutionHeight(product.resolutionHeight);
      setNewCamera(product.camera);
      setNewPhotoResolution(product.photoResolution);
      setNewVideoResolutionWidth(product.videoResolutionWidth);
      setNewVideoResolutionHeight(product.videoResolutionHeight);
      setNewVideoFPS(product.videoFPS);
      setNewHeadphoneJack(product.headphoneJack);
      setNewConnectionType(product.connectionType);
      setNewInterfaces(product.interfaces);
      setNewButtons(product.buttons);
      setNewKeys(product.keys);
      setNewMinimumDPI(product.minimumDPI);
      setNewMaximumDPI(product.maximumDPI);
      setNewMinimumResponseTime(product.minimumResponseTime);
      setNewMaximumResponseTime(product.maximumResponseTime);
      setNewPanel(product.panel);
      setNewBacklight(product.backlight);
      setNewColor(product.color);
      setNewImpedance(product.impedance);
      setNewStrapMaterial(product.strapMaterial);
      setNewHasFingerprintSensor(product.hasFingerprintSensor);
      setNewHasNoiseCancelling(product.hasNoiseCancelling);
      setNewIsWaterproof(product.isWaterproof);
    }
  }, [isFetchingProduct, isProductError, product]);

  useEffect(() => {
    if (isProductError) {
      throw Object.assign(new Error("محصول مورد نظر پیدا نشد."), { status: 404 });
    }
  }, [isProductError]);

  return !isProductError && (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isFetchingProduct ? Array(4).fill().map((cover, index) => <div key={index} className="h-56 w-full animate-pulse rounded-3xl bg-skeleton"></div>) : product.covers.map((cover, index) => <img key={index} src={`${process.env.SERVER_URI}/images/products/${cover}`} alt={product.title} loading="lazy" className="h-56 w-full rounded-3xl object-cover" />)}
      </div>
      <div className="mt-4 flex flex-col gap-3 overflow-auto text-nowrap text-lg sm:flex-row sm:items-center">
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">عنوان:</span>
          <span>{isFetchingProduct ? "در حال بارگذاری" : product.title}</span>
        </div>
        <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">فروش کل:</span>
          <span>{isFetchingProduct ? "در حال بارگذاری" : `${product.colors.reduce((previous, { sales }) => previous + sales, 0)} عدد`}</span>
        </div>
        <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">امتیاز:</span>
          <span>{isFetchingProduct ? "در حال بارگذاری" : `${product.score} ستاره`}</span>
        </div>
        <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">گارانتی:</span>
          <span>{isFetchingProduct ? "در حال بارگذاری" : product.warranty > 0 ? `${product.warranty} ماه` : "ندارد"}</span>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-3 overflow-auto text-nowrap text-lg sm:flex-row sm:items-center">
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">برند:</span>
          <span>{isFetchingProduct ? "در حال بارگذاری" : product.brand.name}</span>
        </div>
        <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">دسته‌بندی‌:</span>
          <span>{isFetchingProduct ? "در حال بارگذاری" : product.category.title}</span>
        </div>
        {!isFetchingProduct && product.offer?.expiresAt && (
          <>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">پیشنهاد:</span>
              <span>{isFetchingProduct ? "در حال بارگذاری" : product.offer.title}</span>
            </div>
          </>
        )}
      </div>
      <div className="mt-3 flex flex-col gap-3 text-nowrap text-lg">
        {isFetchingProduct ? Array(5).fill().map((color, index) => (
          <div key={index} className="flex flex-col gap-3 overflow-auto sm:flex-row sm:items-center">
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">مبلغ رنگ:</span>
              <span>در حال بارگذاری</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">موجودی رنگ:</span>
              <span>در حال بارگذاری</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نام رنگ:</span>
              <span>در حال بارگذاری</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">کد رنگ:</span>
              <span>در حال بارگذاری</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">فروش رنگ:</span>
              <span>در حال بارگذاری</span>
            </div>
          </div>
        )) : product.colors.map(({ _id, price, inventory, name, code, sales }) => (
          <div key={_id} className="flex flex-col gap-3 overflow-auto sm:flex-row sm:items-center">
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">مبلغ رنگ:</span>
              <span>{price.toLocaleString()} تومان</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">موجودی رنگ:</span>
              <span>{inventory.toLocaleString()} عدد</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نام رنگ:</span>
              <span>{name}</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">کد رنگ:</span>
              <span>{code}</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">فروش رنگ:</span>
              <span>{sales} عدد</span>
            </div>
          </div>
        ))}
      </div>
      {!isFetchingProduct && (
        <div className="mt-3 flex flex-col gap-3 overflow-auto text-nowrap text-lg">
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
      )}
      <h6 className="mt-6 font-vazirmatn-bold text-xl">ویرایش محصول</h6>
      <form className="mt-4 text-lg" onSubmit={(event) => {
        event.preventDefault();

        updateProduct(Object.fromEntries(Object.entries({
          title: newTitle,
          warranty: newWarranty,
          colors: [...newColors].map((color) => Object.fromEntries(Object.entries(color).filter(([key, value]) => value !== undefined && value !== null && value !== ""))),
          brand: newBrand,
          category: newCategory,
          length: newLength,
          width: newWidth,
          height: newHeight,
          thickness: newThickness,
          weight: newWeight,
          chip: newChip,
          motherboard: newMotherboard,
          CPU: newCPU,
          CPUSeries: newCPUSeries,
          CPUGeneration: newCPUGeneration,
          CPUFrequency: newCPUFrequency,
          CPUCore: newCPUCore,
          GPU: newGPU,
          GPUModel: newGPUModel,
          GPURAM: newGPURAM,
          operatingSystem: newOperatingSystem,
          operatingSystemVersion: newOperatingSystemVersion,
          internalMemory: newInternalMemory,
          internalMemoryType: newInternalMemoryType,
          drive: newDrive,
          storage: newStorage,
          RAM: newRAM,
          RAMType: newRAMType,
          memoryCard: newMemoryCard,
          SIMCard: newSIMCard,
          network: newNetwork,
          battery: newBattery,
          batteryCapacity: newBatteryCapacity,
          chargingPort: newChargingPort,
          chargingSpeed: newChargingSpeed,
          screen: newScreen,
          screenSize: newScreenSize,
          resolutionWidth: newResolutionWidth,
          resolutionHeight: newResolutionHeight,
          camera: newCamera,
          photoResolution: newPhotoResolution,
          videoResolutionWidth: newVideoResolutionWidth,
          videoResolutionHeight: newVideoResolutionHeight,
          videoFPS: newVideoFPS,
          headphoneJack: newHeadphoneJack,
          connectionType: newConnectionType,
          interfaces: newInterfaces,
          buttons: newButtons,
          keys: newKeys,
          minimumDPI: newMinimumDPI,
          maximumDPI: newMaximumDPI,
          minimumResponseTime: newMinimumResponseTime,
          maximumResponseTime: newMaximumResponseTime,
          panel: newPanel,
          backlight: newBacklight,
          color: newColor,
          impedance: newImpedance,
          strapMaterial: newStrapMaterial,
          hasFingerprintSensor: newHasFingerprintSensor,
          hasNoiseCancelling: newHasNoiseCancelling,
          isWaterproof: newIsWaterproof,
        }).filter(([key, value]) => value !== undefined && value !== null && value !== "" && (Array.isArray(value) ? value.length : true))));
      }}>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <input
            type="text"
            value={newTitle}
            placeholder="عنوان"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewTitle(target.value)}
          />
          <input
            type="text"
            inputMode="numeric"
            value={newWarranty}
            placeholder="گارانتی (ماه)"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => /^\d*$/.test(target.value) && setNewWarranty(target.value)}
          />
          <SelectBox
            title={"برند"}
            options={brands?.map(({ _id, name }) => ({ title: name, value: _id }))}
            currentValue={newBrand}
            setValue={setNewBrand}
          />
          <SelectBox
            title={"دسته‌بندی‌"}
            options={categories?.map(({ _id, title }) => ({ title, value: _id }))}
            currentValue={newCategory}
            setValue={setNewCategory}
          />
          {(product?.__t === "Mobile" || product?.__t === "Tablet" || product?.__t === "Laptop" || product?.__t === "Case" || product?.__t === "Mouse" || product?.__t === "Keyboard" || product?.__t === "Console") && (
            <>
              <input
                type="text"
                inputMode="numeric"
                value={newLength}
                placeholder="طول (میلی‌متر)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewLength(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newWidth}
                placeholder="عرض (میلی‌متر)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewWidth(target.value)}
              />
            </>
          )}
          {(product?.__t === "Case" || product?.__t === "Mouse" || product?.__t === "Keyboard" || product?.__t === "Console") && (
            <input
              type="text"
              inputMode="numeric"
              value={newHeight}
              placeholder="ارتفاع (میلی‌متر)"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => /^\d*$/.test(target.value) && setNewHeight(target.value)}
            />
          )}
          {(product?.__t === "Mobile" || product?.__t === "Tablet" || product?.__t === "Laptop") && (
            <>
              <input
                type="text"
                inputMode="numeric"
                value={newThickness}
                placeholder="ضخامت (میلی‌متر)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewThickness(target.value)}
              />
              <SelectBox
                title={"حسگر اثرانگشت"}
                options={[
                  { title: "دارد", value: true },
                  { title: "ندارد", value: false },
                ]}
                currentValue={newHasFingerprintSensor}
                setValue={setNewHasFingerprintSensor}
              />
            </>
          )}
          {(product?.__t === "Mobile" || product?.__t === "Tablet" || product?.__t === "Laptop" || product?.__t === "Monitor" || product?.__t === "Case" || product?.__t === "Mouse" || product?.__t === "Keyboard" || product?.__t === "Headphone" || product?.__t === "SmartWatch" || product?.__t === "Console") && (
            <input
              type="text"
              inputMode="numeric"
              value={newWeight}
              placeholder="وزن (گرم)"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => /^\d*$/.test(target.value) && setNewWeight(target.value)}
            />
          )}
          {(product?.__t === "Mobile" || product?.__t === "Tablet" || product?.__t === "SmartWatch") && (
            <>
              <input
                type="text"
                value={newChip}
                placeholder="تراشه"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setNewChip(target.value)}
              />
              <SelectBox
                title={"ضد آب"}
                options={[
                  { title: "هست", value: true },
                  { title: "نیست", value: false },
                ]}
                currentValue={newIsWaterproof}
                setValue={setNewIsWaterproof}
              />
            </>
          )}
          {product?.__t === "Case" && (
            <input
              type="text"
              value={newMotherboard}
              placeholder="مادربرد"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => setNewMotherboard(target.value)}
            />
          )}
          {(product?.__t === "Laptop" || product?.__t === "Case" || product?.__t === "Console") && (
            <>
              <SelectBox
                title={"سازنده پردازنده"}
                options={product?.__t === "Laptop" ? [
                  { title: "Intel", value: "Intel" },
                  { title: "AMD", value: "AMD" },
                  { title: "Apple", value: "Apple" },
                ] : product?.__t === "Case" ? [
                  { title: "Intel", value: "Intel" },
                  { title: "AMD", value: "AMD" },
                ] : [{ title: "AMD", value: "AMD" }]}
                currentValue={newCPU}
                setValue={setNewCPU}
              />
              <input
                type="text"
                value={newCPUSeries}
                placeholder="سری پردازنده"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setNewCPUSeries(target.value)}
              />
              <input
                type="text"
                value={newCPUGeneration}
                placeholder="نسل پردازنده"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setNewCPUGeneration(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newCPUFrequency}
                placeholder="فرکانس پردازنده (گیگاهرتز)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewCPUFrequency(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newCPUCore}
                placeholder="تعداد هسته پردازنده"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewCPUCore(target.value)}
              />
              <SelectBox
                title={"سازنده پردازنده گرافیکی"}
                options={product?.__t === "Laptop" ? [
                  { title: "Intel", value: "Intel" },
                  { title: "AMD", value: "AMD" },
                  { title: "NVIDIA", value: "NVIDIA" },
                  { title: "Apple", value: "Apple" },
                ] : product?.__t === "Case" ? [
                  { title: "Intel", value: "Intel" },
                  { title: "AMD", value: "AMD" },
                  { title: "NVIDIA", value: "NVIDIA" },
                ] : [{ title: "AMD", value: "AMD" }]}
                currentValue={newGPU}
                setValue={setNewGPU}
              />
              <input
                type="text"
                value={newGPUModel}
                placeholder="مدل پردازنده گرافیکی"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setNewGPUModel(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newGPURAM}
                placeholder="رم پردازنده گرافیکی (گیگابایت)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewGPURAM(target.value)}
              />
            </>
          )}
          {(product?.__t === "Mobile" || product?.__t === "Tablet" || product?.__t === "Laptop" || product?.__t === "Case" || product?.__t === "SmartWatch") && (
            <>
              <SelectBox
                title={"سیستم عامل"}
                options={product?.__t === "Mobile" || product?.__t === "Tablet" ? [
                  { title: "Android", value: "Android" },
                  { title: "iOS", value: "iOS" },
                ] : product?.__t === "Laptop" ? [
                  { title: "Windows", value: "Windows" },
                  { title: "MacOS", value: "MacOS" },
                  { title: "فاقد سیستم عامل", value: "فاقد سیستم عامل" },
                ] : product?.__t === "Case" ? [
                  { title: "Windows", value: "Windows" },
                  { title: "فاقد سیستم عامل", value: "فاقد سیستم عامل" },
                ] : [
                  { title: "WearOS", value: "WearOS" },
                  { title: "WatchOS", value: "WatchOS" },
                  { title: "Tizen", value: "Tizen" },
                ]}
                currentValue={newOperatingSystem}
                setValue={setNewOperatingSystem}
              />
              {newOperatingSystem !== "فاقد سیستم عامل" && (
                <input
                  type="text"
                  inputMode="numeric"
                  value={newOperatingSystemVersion}
                  placeholder="نسخه سیستم عامل"
                  className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                  onInput={({ target }) => /^\d*$/.test(target.value) && setNewOperatingSystemVersion(target.value)}
                />
              )}
              <SelectBox
                title={"حافظه داخلی"}
                options={product?.__t === "Mobile" || product?.__t === "Tablet" ? [
                  { title: "16 گیگابایت", value: 16 },
                  { title: "32 گیگابایت", value: 32 },
                  { title: "64 گیگابایت", value: 64 },
                  { title: "128 گیگابایت", value: 128 },
                  { title: "256 گیگابایت", value: 256 },
                  { title: "512 گیگابایت", value: 512 },
                  { title: "1024 گیگابایت", value: 1024 },
                ] : product?.__t === "Laptop" || product?.__t === "Case" ? [
                  { title: "128 گیگابایت", value: 128 },
                  { title: "256 گیگابایت", value: 256 },
                  { title: "512 گیگابایت", value: 512 },
                  { title: "1024 گیگابایت", value: 1024 },
                  { title: "2048 گیگابایت", value: 2048 },
                ] : [
                  { title: "16 گیگابایت", value: 16 },
                  { title: "32 گیگابایت", value: 32 },
                  { title: "64 گیگابایت", value: 64 },
                  { title: "128 گیگابایت", value: 128 },
                  { title: "256 گیگابایت", value: 256 },
                ]}
                currentValue={newInternalMemory}
                setValue={setNewInternalMemory}
              />
            </>
          )}
          {(product?.__t === "Laptop" || product?.__t === "Case") && (
            <>
              <SelectBox
                title={"نوع حافظه داخلی"}
                options={[
                  { title: "HDD", value: "HDD" },
                  { title: "SSD", value: "SSD" },
                ]}
                currentValue={newInternalMemoryType}
                setValue={setNewInternalMemoryType}
              />
              <SelectBox
                title={"نوع رم"}
                options={[
                  { title: "DDR3", value: "DDR3" },
                  { title: "DDR4", value: "DDR4" },
                  { title: "DDR5", value: "DDR5" },
                ]}
                currentValue={newRAMType}
                setValue={setNewRAMType}
              />
            </>
          )}
          {product?.__t === "Console" && (
            <>
              <SelectBox
                title={"نوع درایو"}
                options={[
                  { title: "CD", value: "CD" },
                  { title: "DVD", value: "DVD" },
                  { title: "Blue-ray", value: "Blue-ray" },
                  { title: "فاقد درایو", value: "فاقد درایو" },
                ]}
                currentValue={newDrive}
                setValue={setNewDrive}
              />
              <SelectBox
                title={"ظرفیت"}
                options={[
                  { title: "512 گیگابایت", value: 512 },
                  { title: "825 گیگابایت", value: 825 },
                  { title: "1000 گیگابایت", value: 1000 },
                ]}
                currentValue={newStorage}
                setValue={setNewStorage}
              />
            </>
          )}
          {(product?.__t === "Mobile" || product?.__t === "Tablet" || product?.__t === "Laptop" || product?.__t === "Case" || product?.__t === "SmartWatch" || product?.__t === "Console") && (
            <input
              type="text"
              inputMode="numeric"
              value={newRAM}
              placeholder="رم (گیگابایت)"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => /^\d*$/.test(target.value) && setNewRAM(target.value)}
            />
          )}
          {(product?.__t === "Mobile" || product?.__t === "Tablet") && (
            <>
              <SelectBox
                title={"کارت حافظه"}
                options={[
                  { title: "مجزا", value: "مجزا" },
                  { title: "مشترک با سیم‌کارت", value: "مشترک با سیم‌کارت" },
                  { title: "فاقد پشتیبانی", value: "فاقد پشتیبانی" },
                ]}
                currentValue={newMemoryCard}
                setValue={setNewMemoryCard}
              />
              <SelectBox
                title={"تعداد سیم‌کارت"}
                options={[
                  { title: "1 عدد", value: 1 },
                  { title: "2 عدد", value: 2 },
                ]}
                currentValue={newSIMCard}
                setValue={setNewSIMCard}
              />
              <SelectBox
                title={"شبکه ارتباطی"}
                options={[
                  { title: "2G", value: "2G" },
                  { title: "3G", value: "3G" },
                  { title: "4G", value: "4G" },
                  { title: "5G", value: "5G" },
                ]}
                currentValue={newNetwork}
                setValue={setNewNetwork}
              />
              <SelectBox
                title={"درگاه شارژ"}
                options={[
                  { title: "Micro-USB", value: "Micro-USB" },
                  { title: "USB Type-C", value: "USB Type-C" },
                  { title: "Lightning", value: "Lightning" },
                ]}
                currentValue={newChargingPort}
                setValue={setNewChargingPort}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newChargingSpeed}
                placeholder="سرعت شارژ (وات)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewChargingSpeed(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newCamera}
                placeholder="تعداد دوربین"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewCamera(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newPhotoResolution}
                placeholder="رزولوشن عکس (مگاپیکسل)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewPhotoResolution(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newVideoResolutionWidth}
                placeholder="عرض رزولوشن ویدئو (پیکسل)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewVideoResolutionWidth(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newVideoResolutionHeight}
                placeholder="ارتفاع رزولوشن ویدئو (پیکسل)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewVideoResolutionHeight(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newVideoFPS}
                placeholder="سرعت ویدئو (فریم بر ثانیه)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewVideoFPS(target.value)}
              />
              <SelectBox
                title={"جک هدفون"}
                options={[
                  { title: "3.5mm Jack", value: "3.5mm Jack" },
                  { title: "USB Type-C", value: "USB Type-C" },
                  { title: "Lightning", value: "Lightning" },
                ]}
                currentValue={newHeadphoneJack}
                setValue={setNewHeadphoneJack}
              />
            </>
          )}
          {(product?.__t === "Mobile" || product?.__t === "Tablet" || product?.__t === "Laptop" || (product?.__t === "Headphone" && (newConnectionType === "بی‌سیم" || newConnectionType === "با‌سیم و بی‌سیم")) || product?.__t === "SmartWatch") && (
            <>
              <input
                type="text"
                value={newBattery}
                placeholder="نوع باطری"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setNewBattery(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newBatteryCapacity}
                placeholder="ظرفیت باطری (میلی‌آمپر)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewBatteryCapacity(target.value)}
              />
            </>
          )}
          {(product?.__t === "Mobile" || product?.__t === "Tablet" || product?.__t === "Laptop" || product?.__t === "Monitor" || product?.__t === "SmartWatch") && (
            <>
              <input
                type="text"
                value={newScreen}
                placeholder="نوع صفحه نمایش"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setNewScreen(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newScreenSize}
                placeholder="اندازه صفحه نمایش (اینچ)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewScreenSize(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newResolutionWidth}
                placeholder="عرض رزولوشن (پیکسل)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewResolutionWidth(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newResolutionHeight}
                placeholder="ارتفاع رزولوشن (پیکسل)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewResolutionHeight(target.value)}
              />
            </>
          )}
          {(product?.__t === "Mouse" || product?.__t === "Keyboard" || product?.__t === "Headphone") && (
            <>
              <SelectBox
                title={"نوع اتصال"}
                options={[
                  { title: "با‌سیم", value: "با‌سیم" },
                  { title: "بی‌سیم", value: "بی‌سیم" },
                  { title: "با‌سیم و بی‌سیم", value: "با‌سیم و بی‌سیم" },
                ]}
                currentValue={newConnectionType}
                setValue={setNewConnectionType}
              />
              {newConnectionType && (
                <SelectBox
                  title={"رابط ها"}
                  options={product?.__t === "Mouse" || product?.__t === "Keyboard" ? newConnectionType === "با‌سیم" ? [
                    { title: "USB", value: "USB" },
                    { title: "USB Type-C", value: "USB Type-C" },
                  ] : newConnectionType === "بی‌سیم" ? [
                    { title: "USB Dongle", value: "USB Dongle" },
                    { title: "Bluetooth", value: "Bluetooth" },
                  ] : [
                    { title: "USB", value: "USB" },
                    { title: "USB Type-C", value: "USB Type-C" },
                    { title: "USB Dongle", value: "USB Dongle" },
                    { title: "Bluetooth", value: "Bluetooth" },
                  ] : newConnectionType === "با‌سیم" ? [
                    { title: "3.5mm Jack", value: "3.5mm Jack" },
                    { title: "USB", value: "USB" },
                    { title: "Micro-USB", value: "Micro-USB" },
                    { title: "USB Type-C", value: "USB Type-C" },
                    { title: "Lightning", value: "Lightning" },
                  ] : newConnectionType === "بی‌سیم" ? [
                    { title: "USB Dongle", value: "USB Dongle" },
                    { title: "Bluetooth", value: "Bluetooth" },
                  ] : [
                    { title: "3.5mm Jack", value: "3.5mm Jack" },
                    { title: "USB", value: "USB" },
                    { title: "Micro-USB", value: "Micro-USB" },
                    { title: "USB Type-C", value: "USB Type-C" },
                    { title: "USB Dongle", value: "USB Dongle" },
                    { title: "Lightning", value: "Lightning" },
                    { title: "Bluetooth", value: "Bluetooth" },
                  ]}
                  currentValues={newInterfaces}
                  setValues={setNewInterfaces}
                  multiple={true}
                />
              )}
            </>
          )}
          {product?.__t === "Headphone" && (
            <>
              <input
                type="text"
                inputMode="numeric"
                value={newImpedance}
                placeholder="امپدانس (اهم)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewImpedance(target.value)}
              />
              <SelectBox
                title={"قابلیت Noise Cancelling"}
                options={[
                  { title: "دارد", value: true },
                  { title: "ندارد", value: false },
                ]}
                currentValue={newHasNoiseCancelling}
                setValue={setNewHasNoiseCancelling}
              />
            </>
          )}
          {product?.__t === "Mouse" && (
            <>
              <input
                type="text"
                inputMode="numeric"
                value={newButtons}
                placeholder="تعداد کلید"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewButtons(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newMinimumDPI}
                placeholder="حداقل دقت"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewMinimumDPI(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newMaximumDPI}
                placeholder="حداکثر دقت"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewMaximumDPI(target.value)}
              />
            </>
          )}
          {product?.__t === "Keyboard" && (
            <input
              type="text"
              inputMode="numeric"
              value={newKeys}
              placeholder="تعداد کلید"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => /^\d*$/.test(target.value) && setNewKeys(target.value)}
            />
          )}
          {product?.__t === "Monitor" && (
            <>
              <input
                type="text"
                inputMode="numeric"
                value={newMinimumResponseTime}
                placeholder="حداقل زمان پاسخ‌گویی (میلی‌ثانیه)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewMinimumResponseTime(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newMaximumResponseTime}
                placeholder="حداکثر زمان پاسخ‌گویی (میلی‌ثانیه)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewMaximumResponseTime(target.value)}
              />
              <input
                type="text"
                value={newPanel}
                placeholder="پنل"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setNewPanel(target.value)}
              />
              <input
                type="text"
                value={newBacklight}
                placeholder="نور پس‌زمینه"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setNewBacklight(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={newColor}
                placeholder="تعداد رنگ"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setNewColor(target.value)}
              />
            </>
          )}
          {product?.__t === "SmartWatch" && (
            <input
              type="text"
              value={newStrapMaterial}
              placeholder="جنس بند"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => setNewStrapMaterial(target.value)}
            />
          )}
        </div>
        <div className="mt-4">
          {newColors.map(({ price, inventory, name, code }, index) => (
            <div key={index} className="mt-4 flex w-full items-center gap-4 first:mt-0">
              <div className="grid w-full grid-cols-1 items-center gap-4 xs:grid-cols-2 md:grid-cols-4">
                <input
                  type="text"
                  inputMode="numeric"
                  value={price}
                  placeholder="مبلغ رنگ (تومان)"
                  className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                  onInput={({ target }) => /^\d*$/.test(target.value) && setNewColors((newColors) => newColors.map((color, index_) => index_ === index ? { ...color, price: target.value } : color))}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  value={inventory}
                  placeholder="موجودی رنگ"
                  className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                  onInput={({ target }) => /^\d*$/.test(target.value) && setNewColors((newColors) => newColors.map((color, index_) => index_ === index ? { ...color, inventory: target.value } : color))}
                />
                <input
                  type="text"
                  value={name}
                  placeholder="نام رنگ"
                  className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                  onInput={({ target }) => setNewColors((newColors) => newColors.map((color, index_) => index_ === index ? { ...color, name: target.value } : color))}
                />
                <input
                  type="text"
                  value={code}
                  placeholder="کد رنگ"
                  className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                  onInput={({ target }) => setNewColors((newColors) => newColors.map((color, index_) => index_ === index ? { ...color, code: target.value } : color))}
                />
              </div>
              {newColors.length > 1 && (
                <button type="button" className="flex size-11 shrink-0 items-center justify-center rounded-full text-red-500 transition-colors enabled:hover:bg-red-100" onClick={() => setNewColors((newColors) => newColors.filter((color, index_) => index_ !== index))}>
                  <TrashIcon className="size-6" />
                </button>
              )}
            </div>
          ))}
          {newColors.length <= 10 && (
            <button type="button" className="mx-auto mt-4 flex size-12 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={() => setNewColors((newColors) => [...newColors, { price: "", inventory: "", name: "", code: "" }])}>
              <PlusIcon className="size-7" />
            </button>
          )}
        </div>
        <button disabled={isPendingUpdateProduct} className="mt-4 flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
          {isPendingUpdateProduct ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ویرایش"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">دیدگاه ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingProduct ? 0 : product.comments.length.toLocaleString()} دیدگاه</span>
      </div>
      {product?.comments.length === 0 ? (
        <NoResultFound title="دیدگاهی پیدا نشد!" className="mt-4" />
      ) : (
        <div className="mt-4 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>امتیاز</th>
                <th>وضعیت</th>
                <th>فرستنده</th>
                <th>تاریخ ثبت</th>
                <th></th>
              </tr>
            </thead>
            <InfiniteScroll hasNextPage={hasProductNextPage} fetchNextPage={fetchProductNextPage}>
              <tbody>
                {product?.comments.map((comment) => <Comment key={comment._id} {...comment} />)}
                {isFetchingProduct && Array(20).fill().map((comment, index) => <CommentSkeleton key={index} senderField={true} />)}
              </tbody>
            </InfiniteScroll>
          </table>
        </div>
      )}
    </>
  );
};

export default Product;