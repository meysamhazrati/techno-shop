import { object, string, number, array } from "yup";

const validator = object({
  length: number().required().min(50).max(200),
  width: number().required().min(20).max(100),
  height: number().required().min(20).max(100),
  weight: number().required().min(50).max(500),
  buttons: number().required().min(2).max(20),
  connectionType: string().required().oneOf(["Wired", "Wireless", "Wired and Wireless"]),
  interfaces: array().required().of(string().oneOf(["USB", "USB Type-C", "USB Dongle", "Bluetooth"])).min(1).max(4),
  minimumDPI: number().required().min(800).max(30000),
  maximumDPI: number().required().min(800).max(30000),
});

export default validator;