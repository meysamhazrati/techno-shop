import { object, string, number, boolean, array } from "yup";

const validator = object({
  weight: number().required("وزن الزامی است.").min(50, "وزن باید حداقل 50 گرم باشد.").max(5000, "وزن باید حداکثر 5000 گرم باشد."),
  connectionType: string().required("نوع اتصال الزامی است.").oneOf(["با‌سیم", "بی‌سیم", "با‌سیم و بی‌سیم"], "نوع اتصال باید با‌سیم، بی‌سیم یا با‌سیم و بی‌سیم باشد."),
  interfaces: array().required("رابط ها الزامی هستند.").min(1, "رابط ها باید حداقل 1 عدد باشند.").max(7, "رابط ها باید حداکثر 7 عدد باشند.").of(string().oneOf(["3.5mm Jack", "USB", "Micro-USB", "USB Type-C", "USB Dongle", "Lightning", "Bluetooth"], "رابط باید 3.5mm Jack، USB، Micro-USB، USB Type-C، USB Dongle، Lightning یا Bluetooth باشد.")),
  impedance: number().required("امپدانس الزامی است.").min(8, "امپدانس باید حداقل 8 اهم باشد.").max(600, "امپدانس باید حداکثر 600 اهم باشد."),
  battery: string().min(5, "باطری باید حداقل 5 کاراکتر باشد.").max(50, "باطری باید حداکثر 50 کاراکتر باشد."),
  batteryCapacity: number().min(1, "ظرفیت باطری باید حداقل 1 میلی‌آمپر باشد.").max(50, "ظرفیت باطری باید حداکثر 50 میلی‌آمپر باشد."),
  hasNoiseCancelling: boolean().required("وضعیت Noise Cancelling الزامی است."),
});

export default validator;