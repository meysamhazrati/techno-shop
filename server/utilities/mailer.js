import { createTransport } from "nodemailer";

const utility = () => createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  { from: process.env.SMTP_USER });

export default utility;