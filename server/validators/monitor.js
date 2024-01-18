import { object, string, number } from "yup";

const validator = object({
  weight: number().required().min(1000).max(50000),
  screen: string().required().min(3).max(50),
  screenSize: number().required().min(10).max(60),
  resolutionWidth: number().required().min(500).max(10000),
  resolutionHeight: number().required().min(500).max(10000),
  minimumResponseTime: number().required().min(1).max(10),
  maximumResponseTime: number().required().min(1).max(10),
  panel: string().required().min(2).max(20),
  backlight: string().required().min(3).max(20),
  colors: number().required().min(1000000).max(1000000000),
});

export default validator;