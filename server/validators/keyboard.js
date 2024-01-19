import { object, string, number, array } from "yup";

const validator = object({
  length: number().required().min(100).max(500),
  width: number().required().min(50).max(200),
  height: number().required().min(10).max(50),
  weight: number().required().min(500).max(5000),
  keys: number().required().min(40).max(120),
  connectionType: string().required().oneOf(["باسیم", "بی‌سیم", "باسیم و بی‌سیم"]),
  interface: array().required().of(string().oneOf(["USB", "USB Type-C", "USB Dongle", "Bluetooth"])).min(1).max(4),
});

export default validator;