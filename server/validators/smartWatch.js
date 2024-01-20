import { object, string, number, boolean, array } from "yup";

const validator = object({
  weight: number().required().min(30).max(500),
  strapMaterial: string().required().min(3).max(50),
  chip: string().required().min(5).max(100),
  operatingSystem: string().required().oneOf(["WearOS", "WatchOS", "Tizen"]),
  operatingSystemVersion: number().required().min(3).max(10),
  internalMemory: array().required().of(number().oneOf([16, 32, 64, 128, 256])).min(1).max(3),
  RAM: array().required().of(number().min(1).max(10)).min(1).max(3),
  screen: string().required().min(3).max(50),
  screenSize: number().required().min(1).max(4),
  resolutionWidth: number().required().min(200).max(1000),
  resolutionHeight: number().required().min(200).max(1000),
  battery: string().required().min(5).max(50),
  batteryCapacity: number().required().min(200).max(1000),
  isWaterproof: boolean().required(),
});

export default validator;