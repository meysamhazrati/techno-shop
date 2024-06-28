import { object, string, number, array } from "yup";

const validator = object({
  length: number().required("طول الزامی است.").min(100, "طول باید حداقل 100 میلی‌متر باشد.").max(500, "طول باید حداکثر 500 میلی‌متر باشد."),
  width: number().required("عرض الزامی است.").min(50, "عرض باید حداقل 50 میلی‌متر باشد.").max(200, "عرض باید حداکثر 200 میلی‌متر باشد."),
  height: number().required("ارتفاع الزامی است.").min(10, "ارتفاع باید حداقل 10 میلی‌متر باشد.").max(50, "ارتفاع باید حداکثر 50 میلی‌متر باشد."),
  weight: number().required("وزن الزامی است.").min(500, "وزن باید حداقل 500 گرم باشد.").max(5000, "وزن باید حداکثر 5000 گرم باشد."),
  keys: number().required("تعداد کلید الزامی است.").min(40, "تعداد کلید باید حداقل 40 عدد باشد.").max(120, "تعداد کلید باید حداکثر 120 عدد باشد."),
  connectionType: string().required("نوع اتصال الزامی است.").oneOf(["با‌سیم", "بی‌سیم", "با‌سیم و بی‌سیم"], "نوع اتصال باید با‌سیم، بی‌سیم یا با‌سیم و بی‌سیم باشد."),
  interfaces: array().required("رابط ها الزامی هستند.").min(1, "رابط ها باید حداقل 1 عدد باشند.").max(4, "رابط ها باید حداکثر 4 عدد باشند.").of(string().oneOf(["USB", "USB Type-C", "USB Dongle", "Bluetooth"], "رابط باید USB، USB Type-C، USB Dongle یا Bluetooth باشد.")),
});

export default validator;