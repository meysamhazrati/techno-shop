import { object, string, number, array } from "yup";

const validator = object({
  length: number().required().min(100).max(300),
  width: number().required().min(20).max(100),
  height: number().required().min(200).max(500),
  weight: number().required().min(2000).max(7000),
  drive: string().required().oneOf(["CD", "DVD", "Blue-ray", "فاقد درایو"]),
  CPU: string().required().oneOf(["AMD"]),
  CPUSeries: string().required().min(1).max(50),
  CPUGeneration: string().required().min(1).max(50),
  CPUCore: number().required().min(8).max(8),
  GPU: string().required().oneOf(["AMD"]),
  GPUModel: string().required().min(5).max(50),
  storage: array().required().of(number().oneOf([512, 825, 1000])).min(1).max(3),
  RAM: number().required().min(8).max(16),
});

export default validator;