import { object, string, number, boolean, array } from "yup";

const validator = object({
  length: number().required().min(50).max(500),
  width: number().required().min(30).max(300),
  thickness: number().required().min(2).max(20),
  weight: number().required().min(50).max(500),
  chip: string().required().min(5).max(100),
  operatingSystem: string().required().oneOf(["Android", "iOS"]),
  operatingSystemVersion: number().required().min(12).max(20),
  internalMemory: array().required().of(number().oneOf([16, 32, 64, 128, 256, 512, 1024])).min(1).max(4),
  RAM: array().required().of(number().min(2).max(50)).min(1).max(4),
  memoryCard: string().required().oneOf(["مجزا", "مشترک با سیم‌کارت", "فاقد پشتیبانی"]),
  screen: string().required().min(3).max(50),
  screenSize: number().required().min(1).max(10),
  resolutionWidth: number().required().min(500).max(10000),
  resolutionHeight: number().required().min(500).max(10000),
  SIMCard: number().required().oneOf([1, 2]),
  network: string().required().oneOf(["2G", "3G", "4G", "5G"]),
  battery: string().required().min(5).max(50),
  batteryCapacity: number().required().min(3000).max(10000),
  chargingPort: string().required().oneOf(["Micro-USB", "USB Type-C", "Lightning"]),
  chargingSpeed: number().required().min(15).max(150),
  camera: number().required().min(1).max(5),
  photoResolution: number().required().min(12).max(200),
  videoResolutionWidth: number().required().min(500).max(10000),
  videoResolutionHeight: number().required().min(500).max(10000),
  videoFPS: number().required().min(30).max(120),
  headphoneJack: string().required().oneOf(["3.5mm Jack", "USB Type-C", "Lightning"]),
  hasFingerprintSensor: boolean().required(),
  isWaterproof: boolean().required(),
});

export default validator;