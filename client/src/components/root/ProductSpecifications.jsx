import Section from "./Section";
import SectionHeader from "./SectionHeader";

const ProductSpecifications = ({ isFetching, isError, length, width, height, thickness, weight, chip, motherboard, CPU, CPUSeries, CPUGeneration, CPUFrequency, CPUCore, GPU, GPUModel, GPURAM, operatingSystem, operatingSystemVersion, internalMemory, internalMemoryType, drive, storage, RAM, RAMType, memoryCard, SIMCard, network, battery, batteryCapacity, chargingPort, chargingSpeed, screen, screenSize, resolutionWidth, resolutionHeight, camera, photoResolution, videoResolutionWidth, videoResolutionHeight, videoFPS, headphoneJack, connectionType, interfaces, buttons, keys, minimumDPI, maximumDPI, minimumResponseTime, maximumResponseTime, panel, backlight, color, impedance, strapMaterial, hasFingerprintSensor, hasNoiseCancelling, isWaterproof }) => {
  return !isError && (
    <Section>
      <SectionHeader title="مشخصات" />
      <div className="mt-8 divide-y divide-zinc-200 rounded-3xl bg-white p-6 text-xl [&>*>span]:text-zinc-400 [&>*]:grid [&>*]:grid-cols-2 [&>*]:items-center [&>*]:py-4 first:[&>*]:pt-0 last:[&>*]:pb-0 sm:[&>*]:grid-cols-[250px_1fr]">
        {isFetching ? Array(5).fill().map((specification, index) => (
          <div key={index}>
            <span>در حال بارگذاری</span>
            <p>در حال بارگذاری</p>
          </div>
        )) : (
          <>
            {length && width && (height || thickness) && (
              <div>
                <span>ابعاد</span>
                <p>{(height || thickness).toLocaleString()} × {width.toLocaleString()} × {length.toLocaleString()} میلی‌متر</p>
              </div>
            )}
            {weight && (
              <div>
                <span>وزن</span>
                <p>{weight.toLocaleString()} گرم</p>
              </div>
            )}
            {chip && (
              <div>
                <span>تراشه</span>
                <p>{chip}</p>
              </div>
            )}
            {motherboard && (
              <div>
                <span>مادربرد</span>
                <p>{motherboard}</p>
              </div>
            )}
            {CPU && CPUSeries && CPUGeneration && CPUFrequency && CPUCore && (
              <div>
                <span>پردازنده</span>
                <p>{CPU} {CPUSeries} {CPUGeneration} / فرکانس {CPUFrequency.toLocaleString()} گیگاهرتز / {CPUCore.toLocaleString()} هسته</p>
              </div>
            )}
            {GPU && GPUModel && GPURAM && (
              <div>
                <span>پردازنده گرافیکی</span>
                <p>{GPU} {GPUModel} / رم {GPURAM.toLocaleString()} گیگابایت</p>
              </div>
            )}
            {operatingSystem && operatingSystemVersion && (
              <div>
                <span>سیستم عامل</span>
                <p>{operatingSystem === "فاقد سیستم عامل" ? operatingSystem : `${operatingSystemVersion.toLocaleString()} ${operatingSystem}`}</p>
              </div>
            )}
            {internalMemory && (
              <div>
                <span>حافظه داخلی</span>
                <p>{internalMemory.toLocaleString()} گیگابایت {internalMemoryType ? `/ ${internalMemoryType}` : ""}</p>
              </div>
            )}
            {drive && (
              <div>
                <span>نوع درایو</span>
                <p>{drive}</p>
              </div>
            )}
            {storage && (
              <div>
                <span>ظرفیت</span>
                <p>{storage.toLocaleString()} گیگابایت</p>
              </div>
            )}
            {RAM && (
              <div>
                <span>رم</span>
                <p>{RAM.toLocaleString()} گیگابایت {RAMType ? `/ ${RAMType}` : ""}</p>
              </div>
            )}
            {memoryCard && (
              <div>
                <span>کارت حافظه</span>
                <p>{memoryCard}</p>
              </div>
            )}
            {SIMCard && (
              <div>
                <span>تعداد سیم‌کارت</span>
                <p>{SIMCard.toLocaleString()} عدد</p>
              </div>
            )}
            {network && (
              <div>
                <span>شبکه ارتباطی</span>
                <p>{network}</p>
              </div>
            )}
            {battery && batteryCapacity && (
              <div>
                <span>باطری</span>
                <p>{battery} / {batteryCapacity.toLocaleString()} میلی‌آمپر</p>
              </div>
            )}
            {chargingPort && chargingSpeed && (
              <div>
                <span>شارژ</span>
                <p>{chargingPort} / سرعت {chargingSpeed.toLocaleString()} وات</p>
              </div>
            )}
            {screen && screenSize && resolutionWidth && resolutionHeight && (
              <div>
                <span>صفحه نمایش</span>
                <p>{screen} / اندازه {screenSize.toLocaleString()} اینچ / {resolutionHeight.toLocaleString()} × {resolutionWidth.toLocaleString()} پیکسل</p>
              </div>
            )}
            {camera && photoResolution && videoResolutionWidth && videoResolutionHeight && videoFPS && (
              <div>
                <span>دوربین</span>
                <p>{camera.toLocaleString()} عدد / {photoResolution.toLocaleString()} مگاپیکسل / {videoResolutionHeight.toLocaleString()} × {videoResolutionWidth.toLocaleString()} پیکسل {videoFPS.toLocaleString()} فریم بر ثانیه</p>
              </div>
            )}
            {headphoneJack && (
              <div>
                <span>جک هدفون</span>
                <p>{headphoneJack}</p>
              </div>
            )}
            {connectionType && (
              <div>
                <span>نوع اتصال</span>
                <p>{connectionType}</p>
              </div>
            )}
            {interfaces && (
              <div>
                <span>رابط ها</span>
                <p>{interfaces.join(", ")}</p>
              </div>
            )}
            {(buttons || keys) && (
              <div>
                <span>تعداد کلید</span>
                <p>{(buttons || keys).toLocaleString()} عدد</p>
              </div>
            )}
            {minimumDPI && maximumDPI && (
              <div>
                <span>محدوده دقت</span>
                <p>{minimumDPI.toLocaleString()} تا {maximumDPI.toLocaleString()}</p>
              </div>
            )}
            {minimumResponseTime && maximumResponseTime && (
              <div>
                <span>محدوده زمان پاسخ‌گویی</span>
                <p>{minimumResponseTime.toLocaleString()} تا {maximumResponseTime.toLocaleString()} میلی‌ثانیه</p>
              </div>
            )}
            {panel && (
              <div>
                <span>پنل</span>
                <p>{panel}</p>
              </div>
            )}
            {backlight && (
              <div>
                <span>نور پس‌زمینه</span>
                <p>{backlight}</p>
              </div>
            )}
            {color && (
              <div>
                <span>تعداد رنگ</span>
                <p>{color.toLocaleString()} رنگ</p>
              </div>
            )}
            {impedance && (
              <div>
                <span>امپدانس</span>
                <p>{impedance.toLocaleString()} اهم</p>
              </div>
            )}
            {strapMaterial && (
              <div>
                <span>جنس بند</span>
                <p>{strapMaterial}</p>
              </div>
            )}
            {hasFingerprintSensor && (
              <div>
                <span>حسگر اثرانگشت</span>
                <p>{hasFingerprintSensor ? "دارد" : "ندارد"}</p>
              </div>
            )}
            {hasNoiseCancelling && (
              <div>
                <span>قابلیت Noise Cancelling</span>
                <p>{hasNoiseCancelling ? "دارد" : "ندارد"}</p>
              </div>
            )}
            {isWaterproof && (
              <div>
                <span>ضد آب</span>
                <p>{isWaterproof ? "هست" : "نیست"}</p>
              </div>
            )}
          </>
        )}
      </div>
    </Section>
  );
};

export default ProductSpecifications;