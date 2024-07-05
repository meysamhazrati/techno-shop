import { useState, useRef, useEffect } from "react";
import useProducts from "../../hooks/product/useProducts";
import useCreateProduct from "../../hooks/product/useCreateProduct";
import useBrands from "../../hooks/brand/useBrands";
import useCategories from "../../hooks/category/useCategories";
import InfiniteScroll from "../../components/InfiniteScroll";
import Product from "../../components/admin/Product";
import ProductSkeleton from "../../components/admin/ProductSkeleton";
import SelectBox from "../../components/SelectBox";
import NoResultFound from "../../components/NoResultFound";
import Loader from "../../components/Loader";
import TrashIcon from "../../icons/TrashIcon";
import PlusIcon from "../../icons/PlusIcon";

const Products = () => {
  const [type, setType] = useState(null);
  const [title, setTitle] = useState("");
  const [warranty, setWarranty] = useState("");
  const [firstCover, setFirstCover] = useState(null);
  const [secondCover, setSecondCover] = useState(null);
  const [thirdCover, setThirdCover] = useState(null);
  const [fourthCover, setFourthCover] = useState(null);
  const [colors, setColors] = useState([{ price: "", inventory: "", name: "", code: "" }]);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [thickness, setThickness] = useState("");
  const [weight, setWeight] = useState("");
  const [chip, setChip] = useState("");
  const [motherboard, setMotherboard] = useState("");
  const [CPU, setCPU] = useState(null);
  const [CPUSeries, setCPUSeries] = useState("");
  const [CPUGeneration, setCPUGeneration] = useState("");
  const [CPUFrequency, setCPUFrequency] = useState("");
  const [CPUCore, setCPUCore] = useState("");
  const [GPU, setGPU] = useState(null);
  const [GPUModel, setGPUModel] = useState("");
  const [GPURAM, setGPURAM] = useState("");
  const [operatingSystem, setOperatingSystem] = useState(null);
  const [operatingSystemVersion, setOperatingSystemVersion] = useState("");
  const [internalMemory, setInternalMemory] = useState(null);
  const [internalMemoryType, setInternalMemoryType] = useState(null);
  const [drive, setDrive] = useState(null);
  const [storage, setStorage] = useState(null);
  const [RAM, setRAM] = useState("");
  const [RAMType, setRAMType] = useState(null);
  const [memoryCard, setMemoryCard] = useState(null);
  const [SIMCard, setSIMCard] = useState(null);
  const [network, setNetwork] = useState(null);
  const [battery, setBattery] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [chargingPort, setChargingPort] = useState(null);
  const [chargingSpeed, setChargingSpeed] = useState("");
  const [screen, setScreen] = useState("");
  const [screenSize, setScreenSize] = useState("");
  const [resolutionWidth, setResolutionWidth] = useState("");
  const [resolutionHeight, setResolutionHeight] = useState("");
  const [camera, setCamera] = useState("");
  const [photoResolution, setPhotoResolution] = useState("");
  const [videoResolutionWidth, setVideoResolutionWidth] = useState("");
  const [videoResolutionHeight, setVideoResolutionHeight] = useState("");
  const [videoFPS, setVideoFPS] = useState("");
  const [headphoneJack, setHeadphoneJack] = useState(null);
  const [connectionType, setConnectionType] = useState(null);
  const [interfaces, setInterfaces] = useState([]);
  const [buttons, setButtons] = useState("");
  const [keys, setKeys] = useState("");
  const [minimumDPI, setMinimumDPI] = useState("");
  const [maximumDPI, setMaximumDPI] = useState("");
  const [minimumResponseTime, setMinimumResponseTime] = useState("");
  const [maximumResponseTime, setMaximumResponseTime] = useState("");
  const [panel, setPanel] = useState("");
  const [backlight, setBacklight] = useState("");
  const [color, setColor] = useState("");
  const [impedance, setImpedance] = useState("");
  const [strapMaterial, setStrapMaterial] = useState("");
  const [hasFingerprintSensor, setHasFingerprintSensor] = useState(false);
  const [hasNoiseCancelling, setHasNoiseCancelling] = useState(false);
  const [isWaterproof, setIsWaterproof] = useState(false);

  const firstImage = useRef();
  const firstFile = useRef();
  const secondImage = useRef();
  const secondFile = useRef();
  const thirdImage = useRef();
  const thirdFile = useRef();
  const fourthImage = useRef();
  const fourthFile = useRef();

  const { isFetchingProducts, isProductsError, products, total, hasProductsNextPage, fetchProductsNextPage } = useProducts(null, null, null, null, null, null, null, 20);
  const { isPendingCreateProduct, createProduct } = useCreateProduct(type);
  const { brands } = useBrands();
  const { categories } = useCategories();

  useEffect(() => {
    document.title = "تکنوشاپ - مدیریت - محصول ها";
  }, []);

  return (
    <>
      <h6 className="font-vazirmatn-bold text-xl">ثبت محصول جدید</h6>
      <form className="mt-4 text-lg" onSubmit={(event) => {
          event.preventDefault();

          createProduct(Object.fromEntries(Object.entries({
            title: title?.trim(),
            warranty: warranty?.trim(),
            covers: [firstCover, secondCover, thirdCover, fourthCover].filter((cover) => cover),
            colors: [...colors].map((color) => Object.fromEntries(Object.entries(color).filter(([key, value]) => value !== undefined && value !== null && value !== ""))),
            brand: brand?.trim(),
            category: category?.trim(),
            length: length?.trim(),
            width: width?.trim(),
            height: height?.trim(),
            thickness: thickness?.trim(),
            weight: weight?.trim(),
            chip: chip?.trim(),
            motherboard: motherboard?.trim(),
            CPU: CPU?.trim(),
            CPUSeries: CPUSeries?.trim(),
            CPUGeneration: CPUGeneration?.trim(),
            CPUFrequency: CPUFrequency?.trim(),
            CPUCore: CPUCore?.trim(),
            GPU: GPU?.trim(),
            GPUModel: GPUModel?.trim(),
            GPURAM: GPURAM?.trim(),
            operatingSystem: operatingSystem?.trim(),
            operatingSystemVersion: operatingSystemVersion?.trim(),
            internalMemory: internalMemory?.trim(),
            internalMemoryType: internalMemoryType?.trim(),
            drive: drive?.trim(),
            storage: storage?.trim(),
            RAM: RAM?.trim(),
            RAMType: RAMType?.trim(),
            memoryCard: memoryCard?.trim(),
            SIMCard: SIMCard?.trim(),
            network: network?.trim(),
            battery: battery?.trim(),
            batteryCapacity: batteryCapacity?.trim(),
            chargingPort: chargingPort?.trim(),
            chargingSpeed: chargingSpeed?.trim(),
            screen: screen?.trim(),
            screenSize: screenSize?.trim(),
            resolutionWidth: resolutionWidth?.trim(),
            resolutionHeight: resolutionHeight?.trim(),
            camera: camera?.trim(),
            photoResolution: photoResolution?.trim(),
            videoResolutionWidth: videoResolutionWidth?.trim(),
            videoResolutionHeight: videoResolutionHeight?.trim(),
            videoFPS: videoFPS?.trim(),
            headphoneJack: headphoneJack?.trim(),
            connectionType: connectionType?.trim(),
            interfaces,
            buttons: buttons?.trim(),
            keys: keys?.trim(),
            minimumDPI: minimumDPI?.trim(),
            maximumDPI: maximumDPI?.trim(),
            minimumResponseTime: minimumResponseTime?.trim(),
            maximumResponseTime: maximumResponseTime?.trim(),
            panel: panel?.trim(),
            backlight: backlight?.trim(),
            color: color?.trim(),
            impedance: impedance?.trim(),
            strapMaterial: strapMaterial?.trim(),
            hasFingerprintSensor: hasFingerprintSensor,
            hasNoiseCancelling: hasNoiseCancelling,
            isWaterproof: isWaterproof,
          }).filter(([key, value]) => value !== undefined && value !== null && value !== "" && (Array.isArray(value) ? value.length : true))), { onSuccess: () => {
            setType(null);
            setTitle("");
            setWarranty("");
            setFirstCover(null);
            setSecondCover(null);
            setThirdCover(null);
            setFourthCover(null);
            setColors([{ price: "", inventory: "", name: "", code: "" }]);
            setBrand(null);
            setCategory(null);
            setLength("");
            setWidth("");
            setHeight("");
            setThickness("");
            setWeight("");
            setChip("");
            setMotherboard("");
            setCPU(null);
            setCPUSeries("");
            setCPUGeneration("");
            setCPUFrequency("");
            setCPUCore("");
            setGPU(null);
            setGPUModel("");
            setGPURAM("");
            setOperatingSystem(null);
            setOperatingSystemVersion("");
            setInternalMemory(null);
            setInternalMemoryType(null);
            setDrive(null);
            setStorage(null);
            setRAM("");
            setRAMType(null);
            setMemoryCard(null);
            setSIMCard(null);
            setNetwork(null);
            setBattery("");
            setBatteryCapacity("");
            setChargingPort(null);
            setChargingSpeed("");
            setScreen("");
            setScreenSize("");
            setResolutionWidth("");
            setResolutionHeight("");
            setCamera("");
            setPhotoResolution("");
            setVideoResolutionWidth("");
            setVideoResolutionHeight("");
            setVideoFPS("");
            setHeadphoneJack(null);
            setConnectionType(null);
            setInterfaces([]);
            setButtons("");
            setKeys("");
            setMinimumDPI("");
            setMaximumDPI("");
            setMinimumResponseTime("");
            setMaximumResponseTime("");
            setPanel("");
            setBacklight("");
            setColor("");
            setImpedance("");
            setStrapMaterial("");
            setHasFingerprintSensor(false);
            setHasNoiseCancelling(false);
            setIsWaterproof(false);
            firstImage.current.src = "";
            firstFile.current.value = null;
            secondImage.current.src = "";
            secondFile.current.value = null;
            thirdImage.current.src = "";
            thirdFile.current.value = null;
            fourthImage.current.src = "";
            fourthFile.current.value = null;
          } });
      }}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="h-56 w-full shrink-0 cursor-pointer" onClick={() => firstFile.current.click()}>
            {firstFile.current?.files.length ? <img ref={firstImage} alt="Category Logo" loading="lazy" className="size-full rounded-3xl object-cover" /> : <div className="flex size-full items-center justify-center rounded-3xl border border-zinc-200 text-zinc-400">کاور اول</div>}
            <input
              ref={firstFile}
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              className="hidden"
              onChange={({ target }) => {
                if (target.files[0]) {
                  const reader = new FileReader();

                  reader.addEventListener("load", ({ target }) => (firstImage.current.src = target.result));

                  reader.readAsDataURL(target.files[0]);

                  setFirstCover(target.files[0]);
                }
              }}
            />
          </div>
          <div className="h-56 w-full shrink-0 cursor-pointer" onClick={() => secondFile.current.click()}>
            {secondFile.current?.files.length ? <img ref={secondImage} alt="Category Logo" loading="lazy" className="size-full rounded-3xl object-cover" /> : <div className="flex size-full items-center justify-center rounded-3xl border border-zinc-200 text-zinc-400">کاور دوم</div>}
            <input
              ref={secondFile}
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              className="hidden"
              onChange={({ target }) => {
                if (target.files[0]) {
                  const reader = new FileReader();

                  reader.addEventListener("load", ({ target }) => (secondImage.current.src = target.result));

                  reader.readAsDataURL(target.files[0]);

                  setSecondCover(target.files[0]);
                }
              }}
            />
          </div>
          <div className="h-56 w-full shrink-0 cursor-pointer" onClick={() => thirdFile.current.click()}>
            {thirdFile.current?.files.length ? <img ref={thirdImage} alt="Category Logo" loading="lazy" className="size-full rounded-3xl object-cover" /> : <div className="flex size-full items-center justify-center rounded-3xl border border-zinc-200 text-zinc-400">کاور سوم</div>}
            <input
              ref={thirdFile}
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              className="hidden"
              onChange={({ target }) => {
                if (target.files[0]) {
                  const reader = new FileReader();

                  reader.addEventListener("load", ({ target }) => (thirdImage.current.src = target.result));

                  reader.readAsDataURL(target.files[0]);

                  setThirdCover(target.files[0]);
                }
              }}
            />
          </div>
          <div className="h-56 w-full shrink-0 cursor-pointer" onClick={() => fourthFile.current.click()}>
            {fourthFile.current?.files.length ? <img ref={fourthImage} alt="Category Logo" loading="lazy" className="size-full rounded-3xl object-cover" /> : <div className="flex size-full items-center justify-center rounded-3xl border border-zinc-200 text-zinc-400">کاور چهارم</div>}
            <input
              ref={fourthFile}
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              className="hidden"
              onChange={({ target }) => {
                if (target.files[0]) {
                  const reader = new FileReader();

                  reader.addEventListener("load", ({ target }) => (fourthImage.current.src = target.result));

                  reader.readAsDataURL(target.files[0]);

                  setFourthCover(target.files[0]);
                }
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          {colors.map(({ price, inventory, name, code }, index) => (
            <div key={index} className="mt-4 flex w-full items-center gap-4 first:mt-0">
              <div className="grid w-full grid-cols-1 items-center gap-4 xs:grid-cols-2 md:grid-cols-4">
                <input
                  type="text"
                  inputMode="numeric"
                  value={price}
                  placeholder="مبلغ رنگ (تومان)"
                  className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                  onInput={({ target }) => /^\d*$/.test(target.value) && setColors((colors) => colors.map((color, index_) => index_ === index ? { ...color, price: target.value } : color))}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  value={inventory}
                  placeholder="موجودی رنگ"
                  className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                  onInput={({ target }) => /^\d*$/.test(target.value) && setColors((colors) => colors.map((color, index_) => index_ === index ? { ...color, inventory: target.value } : color))}
                />
                <input
                  type="text"
                  value={name}
                  placeholder="نام رنگ"
                  className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                  onInput={({ target }) => setColors((colors) => colors.map((color, index_) => index_ === index ? { ...color, name: target.value } : color))}
                />
                <input
                  type="text"
                  value={code}
                  placeholder="کد رنگ"
                  className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                  onInput={({ target }) => setColors((colors) => colors.map((color, index_) => index_ === index ? { ...color, code: target.value } : color))}
                />
              </div>
              <button type="button" className="flex size-11 shrink-0 items-center justify-center rounded-full text-red-500 transition-colors enabled:hover:bg-red-100" onClick={() => setColors((colors) => colors.filter((color, index_) => index_ !== index))}>
                <TrashIcon className="size-6" />
              </button>
            </div>
          ))}
          {colors.length <= 10 && (
            <button type="button" className="mx-auto mt-4 flex size-12 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={() => setColors((colors) => [...colors, { price: "", inventory: "", name: "", code: "" }])}>
              <PlusIcon className="size-7" />
            </button>
          )}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SelectBox
            title={"نوع"}
            options={[
              { title: "موبایل", value: "Mobile" },
              { title: "تبلت", value: "Tablet" },
              { title: "لپ‌تاپ", value: "Laptop" },
              { title: "مانیتور", value: "Monitor" },
              { title: "کیس", value: "Case" },
              { title: "موس", value: "Mouse" },
              { title: "کیبورد", value: "Keyboard" },
              { title: "هدفون", value: "Headphone" },
              { title: "ساعت هوشمند", value: "SmartWatch" },
              { title: "کنسول", value: "Console" },
            ]}
            currentValue={type}
            setValue={setType}
          />
          <input
            type="text"
            value={title}
            placeholder="عنوان"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setTitle(target.value)}
          />
          <input
            type="text"
            inputMode="numeric"
            value={warranty}
            placeholder="گارانتی (ماه)"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => /^\d*$/.test(target.value) && setWarranty(target.value)}
          />
          <SelectBox
            title={"برند"}
            options={brands?.map(({ _id, name }) => ({ title: name, value: _id }))}
            currentValue={brand}
            setValue={setBrand}
          />
          <SelectBox
            title={"دسته‌بندی‌"}
            options={categories?.map(({ _id, title }) => ({ title, value: _id }))}
            currentValue={category}
            setValue={setCategory}
          />
          {(type === "Mobile" || type === "Tablet" || type === "Laptop" || type === "Case" || type === "Mouse" || type === "Keyboard" || type === "Console") && (
            <>
              <input
                type="text"
                inputMode="numeric"
                value={length}
                placeholder="طول (میلی‌متر)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setLength(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={width}
                placeholder="عرض (میلی‌متر)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setWidth(target.value)}
              />
            </>
          )}
          {(type === "Case" || type === "Mouse" || type === "Keyboard" || type === "Console") && (
            <input
              type="text"
              inputMode="numeric"
              value={height}
              placeholder="ارتفاع (میلی‌متر)"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => /^\d*$/.test(target.value) && setHeight(target.value)}
            />
          )}
          {(type === "Mobile" || type === "Tablet" || type === "Laptop") && (
            <>
              <input
                type="text"
                inputMode="numeric"
                value={thickness}
                placeholder="ضخامت (میلی‌متر)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setThickness(target.value)}
              />
              <SelectBox
                title={"حسگر اثرانگشت"}
                options={[
                  { title: "دارد", value: true },
                  { title: "ندارد", value: false },
                ]}
                currentValue={hasFingerprintSensor}
                setValue={setHasFingerprintSensor}
              />
            </>
          )}
          {(type === "Mobile" || type === "Tablet" || type === "Laptop" || type === "Monitor" || type === "Case" || type === "Mouse" || type === "Keyboard" || type === "Headphone" || type === "SmartWatch" || type === "Console") && (
            <input
              type="text"
              inputMode="numeric"
              value={weight}
              placeholder="وزن (گرم)"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => /^\d*$/.test(target.value) && setWeight(target.value)}
            />
          )}
          {(type === "Mobile" || type === "Tablet" || type === "SmartWatch") && (
            <>
              <input
                type="text"
                value={chip}
                placeholder="تراشه"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setChip(target.value)}
              />
              <SelectBox
                title={"ضد آب"}
                options={[
                  { title: "هست", value: true },
                  { title: "نیست", value: false },
                ]}
                currentValue={isWaterproof}
                setValue={setIsWaterproof}
              />
            </>
          )}
          {type === "Case" && (
            <input
              type="text"
              value={motherboard}
              placeholder="مادربرد"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => setMotherboard(target.value)}
            />
          )}
          {(type === "Laptop" || type === "Case" || type === "Console") && (
            <>
              <SelectBox
                title={"سازنده پردازنده"}
                options={type === "Laptop" ? [
                  { title: "Intel", value: "Intel" },
                  { title: "AMD", value: "AMD" },
                  { title: "Apple", value: "Apple" },
                ] : type === "Case" ? [
                  { title: "Intel", value: "Intel" },
                  { title: "AMD", value: "AMD" },
                ] : [{ title: "AMD", value: "AMD" }]}
                currentValue={CPU}
                setValue={setCPU}
              />
              <input
                type="text"
                value={CPUSeries}
                placeholder="سری پردازنده"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setCPUSeries(target.value)}
              />
              <input
                type="text"
                value={CPUGeneration}
                placeholder="نسل پردازنده"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setCPUGeneration(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={CPUFrequency}
                placeholder="فرکانس پردازنده (گیگاهرتز)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setCPUFrequency(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={CPUCore}
                placeholder="تعداد هسته پردازنده"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setCPUCore(target.value)}
              />
              <SelectBox
                title={"سازنده پردازنده گرافیکی"}
                options={type === "Laptop" ? [
                  { title: "Intel", value: "Intel" },
                  { title: "AMD", value: "AMD" },
                  { title: "NVIDIA", value: "NVIDIA" },
                  { title: "Apple", value: "Apple" },
                ] : type === "Case" ? [
                  { title: "Intel", value: "Intel" },
                  { title: "AMD", value: "AMD" },
                  { title: "NVIDIA", value: "NVIDIA" },
                ] : [{ title: "AMD", value: "AMD" }]}
                currentValue={GPU}
                setValue={setGPU}
              />
              <input
                type="text"
                value={GPUModel}
                placeholder="مدل پردازنده گرافیکی"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setGPUModel(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={GPURAM}
                placeholder="رم پردازنده گرافیکی (گیگابایت)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setGPURAM(target.value)}
              />
            </>
          )}
          {(type === "Mobile" || type === "Tablet" || type === "Laptop" || type === "Case" || type === "SmartWatch") && (
            <>
              <SelectBox
                title={"سیستم عامل"}
                options={type === "Mobile" || type === "Tablet" ? [
                  { title: "Android", value: "Android" },
                  { title: "iOS", value: "iOS" },
                ] : type === "Laptop" ? [
                  { title: "Windows", value: "Windows" },
                  { title: "MacOS", value: "MacOS" },
                  { title: "فاقد سیستم عامل", value: "فاقد سیستم عامل" },
                ] : type === "Case" ? [
                  { title: "Windows", value: "Windows" },
                  { title: "فاقد سیستم عامل", value: "فاقد سیستم عامل" },
                ] : [
                  { title: "WearOS", value: "WearOS" },
                  { title: "WatchOS", value: "WatchOS" },
                  { title: "Tizen", value: "Tizen" },
                ]}
                currentValue={operatingSystem}
                setValue={setOperatingSystem}
              />
              {operatingSystem !== "فاقد سیستم عامل" && (
                <input
                  type="text"
                  inputMode="numeric"
                  value={operatingSystemVersion}
                  placeholder="نسخه سیستم عامل"
                  className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                  onInput={({ target }) => /^\d*$/.test(target.value) && setOperatingSystemVersion(target.value)}
                />
              )}
              <SelectBox
                title={"حافظه داخلی"}
                options={type === "Mobile" || type === "Tablet" ? [
                  { title: "16 گیگابایت", value: 16 },
                  { title: "32 گیگابایت", value: 32 },
                  { title: "64 گیگابایت", value: 64 },
                  { title: "128 گیگابایت", value: 128 },
                  { title: "256 گیگابایت", value: 256 },
                  { title: "512 گیگابایت", value: 512 },
                  { title: "1024 گیگابایت", value: 1024 },
                ] : type === "Laptop" || type === "Case" ? [
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
                currentValue={internalMemory}
                setValue={setInternalMemory}
              />
            </>
          )}
          {(type === "Laptop" || type === "Case") && (
            <>
              <SelectBox
                title={"نوع حافظه داخلی"}
                options={[
                  { title: "HDD", value: "HDD" },
                  { title: "SSD", value: "SSD" },
                ]}
                currentValue={internalMemoryType}
                setValue={setInternalMemoryType}
              />
              <SelectBox
                title={"نوع رم"}
                options={[
                  { title: "DDR3", value: "DDR3" },
                  { title: "DDR4", value: "DDR4" },
                  { title: "DDR5", value: "DDR5" },
                ]}
                currentValue={RAMType}
                setValue={setRAMType}
              />
            </>
          )}
          {type === "Console" && (
            <>
              <SelectBox
                title={"نوع درایو"}
                options={[
                  { title: "CD", value: "CD" },
                  { title: "DVD", value: "DVD" },
                  { title: "Blue-ray", value: "Blue-ray" },
                  { title: "فاقد درایو", value: "فاقد درایو" },
                ]}
                currentValue={drive}
                setValue={setDrive}
              />
              <SelectBox
                title={"ظرفیت"}
                options={[
                  { title: "512 گیگابایت", value: 512 },
                  { title: "825 گیگابایت", value: 825 },
                  { title: "1000 گیگابایت", value: 1000 },
                ]}
                currentValue={storage}
                setValue={setStorage}
              />
            </>
          )}
          {(type === "Mobile" || type === "Tablet" || type === "Laptop" || type === "Case" || type === "SmartWatch" || type === "Console") && (
            <input
              type="text"
              inputMode="numeric"
              value={RAM}
              placeholder="رم (گیگابایت)"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => /^\d*$/.test(target.value) && setRAM(target.value)}
            />
          )}
          {(type === "Mobile" || type === "Tablet") && (
            <>
              <SelectBox
                title={"کارت حافظه"}
                options={[
                  { title: "مجزا", value: "مجزا" },
                  { title: "مشترک با سیم‌کارت", value: "مشترک با سیم‌کارت" },
                  { title: "فاقد پشتیبانی", value: "فاقد پشتیبانی" },
                ]}
                currentValue={memoryCard}
                setValue={setMemoryCard}
              />
              <SelectBox
                title={"تعداد سیم‌کارت"}
                options={[
                  { title: "1 عدد", value: 1 },
                  { title: "2 عدد", value: 2 },
                ]}
                currentValue={SIMCard}
                setValue={setSIMCard}
              />
              <SelectBox
                title={"شبکه ارتباطی"}
                options={[
                  { title: "2G", value: "2G" },
                  { title: "3G", value: "3G" },
                  { title: "4G", value: "4G" },
                  { title: "5G", value: "5G" },
                ]}
                currentValue={network}
                setValue={setNetwork}
              />
              <SelectBox
                title={"درگاه شارژ"}
                options={[
                  { title: "Micro-USB", value: "Micro-USB" },
                  { title: "USB Type-C", value: "USB Type-C" },
                  { title: "Lightning", value: "Lightning" },
                ]}
                currentValue={chargingPort}
                setValue={setChargingPort}
              />
              <input
                type="text"
                inputMode="numeric"
                value={chargingSpeed}
                placeholder="سرعت شارژ (وات)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setChargingSpeed(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={camera}
                placeholder="تعداد دوربین"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setCamera(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={photoResolution}
                placeholder="رزولوشن عکس (مگاپیکسل)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setPhotoResolution(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={videoResolutionWidth}
                placeholder="عرض رزولوشن ویدئو (پیکسل)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setVideoResolutionWidth(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={videoResolutionHeight}
                placeholder="ارتفاع رزولوشن ویدئو (پیکسل)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setVideoResolutionHeight(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={videoFPS}
                placeholder="سرعت ویدئو (فریم بر ثانیه)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setVideoFPS(target.value)}
              />
              <SelectBox
                title={"جک هدفون"}
                options={[
                  { title: "3.5mm Jack", value: "3.5mm Jack" },
                  { title: "USB Type-C", value: "USB Type-C" },
                  { title: "Lightning", value: "Lightning" },
                ]}
                currentValue={headphoneJack}
                setValue={setHeadphoneJack}
              />
            </>
          )}
          {(type === "Mobile" || type === "Tablet" || type === "Laptop" || (type === "Headphone" && (connectionType === "بی‌سیم" || connectionType === "با‌سیم و بی‌سیم")) || type === "SmartWatch") && (
            <>
              <input
                type="text"
                value={battery}
                placeholder="نوع باطری"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setBattery(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={batteryCapacity}
                placeholder="ظرفیت باطری (میلی‌آمپر)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setBatteryCapacity(target.value)}
              />
            </>
          )}
          {(type === "Mobile" || type === "Tablet" || type === "Laptop" || type === "Monitor" || type === "SmartWatch") && (
            <>
              <input
                type="text"
                value={screen}
                placeholder="نوع صفحه نمایش"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setScreen(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={screenSize}
                placeholder="اندازه صفحه نمایش (اینچ)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setScreenSize(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={resolutionWidth}
                placeholder="عرض رزولوشن (پیکسل)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setResolutionWidth(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={resolutionHeight}
                placeholder="ارتفاع رزولوشن (پیکسل)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setResolutionHeight(target.value)}
              />
            </>
          )}
          {(type === "Mouse" || type === "Keyboard" || type === "Headphone") && (
            <>
              <SelectBox
                title={"نوع اتصال"}
                options={[
                  { title: "با‌سیم", value: "با‌سیم" },
                  { title: "بی‌سیم", value: "بی‌سیم" },
                  { title: "با‌سیم و بی‌سیم", value: "با‌سیم و بی‌سیم" },
                ]}
                currentValue={connectionType}
                setValue={setConnectionType}
              />
              {connectionType && (
                <SelectBox
                  title={"رابط ها"}
                  options={type === "Mouse" || type === "Keyboard" ? connectionType === "با‌سیم" ? [
                    { title: "USB", value: "USB" },
                    { title: "USB Type-C", value: "USB Type-C" },
                  ] : connectionType === "بی‌سیم" ? [
                    { title: "USB Dongle", value: "USB Dongle" },
                    { title: "Bluetooth", value: "Bluetooth" },
                  ] : [
                    { title: "USB", value: "USB" },
                    { title: "USB Type-C", value: "USB Type-C" },
                    { title: "USB Dongle", value: "USB Dongle" },
                    { title: "Bluetooth", value: "Bluetooth" },
                  ] : connectionType === "با‌سیم" ? [
                    { title: "3.5mm Jack", value: "3.5mm Jack" },
                    { title: "USB", value: "USB" },
                    { title: "Micro-USB", value: "Micro-USB" },
                    { title: "USB Type-C", value: "USB Type-C" },
                    { title: "Lightning", value: "Lightning" },
                  ] : connectionType === "بی‌سیم" ? [
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
                  currentValues={interfaces}
                  setValues={setInterfaces}
                  multiple={true}
                />
              )}
            </>
          )}
          {type === "Headphone" && (
            <>
              <input
                type="text"
                inputMode="numeric"
                value={impedance}
                placeholder="امپدانس (اهم)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setImpedance(target.value)}
              />
              <SelectBox
                title={"قابلیت Noise Cancelling"}
                options={[
                  { title: "دارد", value: true },
                  { title: "ندارد", value: false },
                ]}
                currentValue={hasNoiseCancelling}
                setValue={setHasNoiseCancelling}
              />
            </>
          )}
          {type === "Mouse" && (
            <>
              <input
                type="text"
                inputMode="numeric"
                value={buttons}
                placeholder="تعداد کلید"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setButtons(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={minimumDPI}
                placeholder="حداقل دقت"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setMinimumDPI(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={maximumDPI}
                placeholder="حداکثر دقت"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setMaximumDPI(target.value)}
              />
            </>
          )}
          {type === "Keyboard" && (
            <input
              type="text"
              inputMode="numeric"
              value={keys}
              placeholder="تعداد کلید"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => /^\d*$/.test(target.value) && setKeys(target.value)}
            />
          )}
          {type === "Monitor" && (
            <>
              <input
                type="text"
                inputMode="numeric"
                value={minimumResponseTime}
                placeholder="حداقل زمان پاسخ‌گویی (میلی‌ثانیه)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setMinimumResponseTime(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={maximumResponseTime}
                placeholder="حداکثر زمان پاسخ‌گویی (میلی‌ثانیه)"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setMaximumResponseTime(target.value)}
              />
              <input
                type="text"
                value={panel}
                placeholder="پنل"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setPanel(target.value)}
              />
              <input
                type="text"
                value={backlight}
                placeholder="نور پس‌زمینه"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => setBacklight(target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                value={color}
                placeholder="تعداد رنگ"
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
                onInput={({ target }) => /^\d*$/.test(target.value) && setColor(target.value)}
              />
            </>
          )}
          {type === "SmartWatch" && (
            <input
              type="text"
              value={strapMaterial}
              placeholder="جنس بند"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => setStrapMaterial(target.value)}
            />
          )}
        </div>
        <button disabled={isPendingCreateProduct} className="mt-4 flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
          {isPendingCreateProduct ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ثبت"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">محصول ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingProducts || isProductsError ? 0 : total.toLocaleString()} محصول</span>
      </div>
      {isProductsError ? (
        <NoResultFound title="محصولی پیدا نشد!" className="mt-4" />
      ) : (
        <div className="mt-4 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>کاور</th>
                <th>عنوان</th>
                <th>امتیاز</th>
                <th>برند</th>
                <th>دسته‌بندی‌</th>
                <th></th>
              </tr>
            </thead>
            <InfiniteScroll hasNextPage={hasProductsNextPage} fetchNextPage={fetchProductsNextPage}>
              <tbody>
                {products?.map((product) => <Product key={product._id} {...product} />)}
                {isFetchingProducts && Array(20).fill().map((product, index) => <ProductSkeleton key={index} />)}
              </tbody>
            </InfiniteScroll>
          </table>
        </div>
      )}
    </>
  );
};

export default Products;