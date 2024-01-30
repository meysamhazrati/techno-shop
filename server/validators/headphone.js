import { object, string, number, boolean, array } from "yup";

const validator = object({
  weight: number().required().min(50).max(5000),
  type: number().required().oneOf([1, 2]),
  connectionType: string().required().oneOf(["Wired", "Wireless", "Wired and Wireless"]),
  interfaces: array().required().of(string().oneOf(["3.5mm Jack", "USB", "Micro-USB", "USB Type-C", "USB Dongle", "Lightning", "Bluetooth"])).min(1).max(7),
  impedance: number().required().min(8).max(600),
  battery: string().min(5).max(50),
  batteryCapacity: number().min(1).max(50),
  hasNoiseCancelling: boolean().required(),
});

export default validator;