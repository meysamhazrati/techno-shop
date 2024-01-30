import { object, string, number } from "yup";

const validator = object({
  length: number().required().min(300).max(700),
  width: number().required().min(100).max(500),
  height: number().required().min(300).max(800),
  weight: number().required().min(4000).max(30000),
  motherboard: string().required().min(2).max(20),
  CPU: string().required().oneOf(["Intel", "AMD"]),
  CPUSeries: string().required().min(1).max(50),
  CPUGeneration: string().required().min(5).max(50),
  CPUFrequency: number().required().min(1).max(10),
  CPUCore: number().required().min(2).max(20),
  GPU: string().required().oneOf(["Intel", "AMD", "NVIDIA"]),
  GPUModel: string().required().min(5).max(50),
  VRAM: number().required().min(2).max(30),
  operatingSystem: string().required().oneOf(["Windows", "No operating system"]),
  operatingSystemVersion: number().oneOf([10, 11]),
  internalMemory: number().required().oneOf([128, 256, 512, 1024, 2048]),
  internalMemoryType: string().required().oneOf(["HDD", "SSD"]),
  RAM: number().required().min(2).max(128),
  RAMType: string().required().oneOf(["DDR3", "DDR4", "DDR5"]),
});

export default validator;