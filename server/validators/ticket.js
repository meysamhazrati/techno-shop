import { object, string } from "yup";

const validator = object({
  department: string().required().oneOf(["Management", "Finance", "Order Tracking", "Support", "Feedback", "Other"]),
  title: string().required().min(2).max(20),
  body: string().required().min(5).max(300),
});

export default validator;