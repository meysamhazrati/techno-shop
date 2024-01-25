import { createTransport } from "nodemailer";

const utility = () => createTransport({
    service: "gmail",
    auth: {
      user: "technoooshop@gmail.com",
      pass: "etiv vnoz gaka qjod",
    },
  },
  { from: "technoooshop@gmail.com" });

export default utility;