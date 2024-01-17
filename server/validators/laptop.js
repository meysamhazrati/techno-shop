import { object, string, number, boolean, array } from "yup";

const validator = object({
  length: number().required().min(300).max(500),
  width: number().required().min(200).max(500),
  thickness: number().required().min(10).max(30),
  weight: number().required().min(1000).max(3000),
  CPU: string().required().oneOf(["Intel", "AMD", "Apple"]),
  CPUSeries: string().required().min(1).max(50),
  CPUGeneration: string().required().min(5).max(50),
  CPUFrequency: number().required().min(1).max(10),
  CPUCore: number().required().min(2).max(20),
  GPU: string().required().oneOf(["Intel", "AMD", "NVIDIA", "Apple"]),
  GPUModel: string().required().min(5).max(50),
  GPUMemory: number().required().min(2).max(128),
  operatingSystem: string().required().oneOf(["Windows", "MacOS", "بدون سیستم عامل"]),
  operatingSystemVersion: number().required().min(10).max(15),
  internalMemory: array().required().of(number().oneOf([128, 256, 512, 1024, 2048])).min(1).max(5),
  internalMemoryType: string().required().oneOf(["HDD", "SSD"]),
  RAM: array().required().of(number().min(2).max(128)).min(1).max(5),
  RAMType: string().required().oneOf(["DDR3", "DDR4", "DDR5"]),
  screen: string().required().min(3).max(50),
  screenSize: number().required().min(10).max(20),
  resolutionWidth: number().required().min(500).max(10000),
  resolutionHeight: number().required().min(500).max(10000),
  battery: string().required().min(5).max(50),
  batteryCapacity: number().required().min(30).max(150),
  hasFingerprintSensor: boolean().required(),
});

export default validator;