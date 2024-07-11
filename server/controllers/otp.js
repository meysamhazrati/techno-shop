import model from "../models/otp.js";
import userModel from "../models/user.js";
import validator from "../validators/otp.js";
import mailer from "../utilities/mailer.js";

const send = async (request, response, next) => {
  try {
    const { type = "register" } = request.query;
    
    const body = Object.fromEntries(Object.entries(request.body).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
    
    await validator.send.validate(body);

    const isExists = await userModel.findOne({ email: { $regex: new RegExp(`^${body.email}$`, "i") } });

    if (isExists && type === "register") {
      throw Object.assign(new Error("ایمیل وارد شده از قبل وجود دارد."), { status: 409 });
    } else if (!isExists && type === "reset-password") {
      throw Object.assign(new Error("ایمیل وارد شده نامعتبر است."), { status: 409 });
    } else {
      const isBlocked = await model.findOne({ email: { $regex: new RegExp(`^${body.email}$`, "i") }, tries: 3 });

      if (isBlocked) {
        throw Object.assign(new Error("ایمیل شما به دلیل درخواست‌های مکرر تا چند ساعت مسدود شده است."), { status: 403 });
      } else {
        const activeOTP = await model.findOne({ email: { $regex: new RegExp(`^${body.email}$`, "i") }, expiresAt: { $gt: new Date() }, isVerified: false });

        let code = null;
        let expiresAt = null;

        if (activeOTP) {
          ({ code, expiresAt } = activeOTP);
        } else {
          await model.deleteOne({ email: { $regex: new RegExp(`^${body.email}$`, "i") } });

          ({ code, expiresAt } = await model.create({ email: body.email }));
        }

        const transporter = mailer();

        transporter.sendMail({
          to: body.email,
          subject: "تکنوشاپ",
          html: 
            `<table style="max-width: 40rem; color: #3c3f44; font-size: 1rem; padding: 0 1rem; margin: 0 auto; direction: rtl;">
              <tbody>
                <tr>
                  <td>
                    <p>کد تایید شما:</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h1 style="text-align: center; margin: 1rem 0">
                      <code style="background-color: #d6d8db; padding: 0.3rem 1rem; border-radius: 0.7rem;">${code}</code>
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>این کد تایید تا تاریخ <strong>${new Intl.DateTimeFormat("fa", { year: "numeric", month: "2-digit", day: "2-digit" }).format(expiresAt)}</strong> ساعت <strong>${new Intl.DateTimeFormat("fa", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(expiresAt)}</strong> اعتبار دارد.</p>
                  </td>
                </tr>
                <tfoot>
                  <tr>
                    <td>
                      <span style="text-align: center; padding-top: 1rem; margin-top: 1rem; border-top: 1px solid #d6d8db; display: block;">&copy; فروشگاه اینترنتی <a href="https://github.com/meysamhazrati/techno-shop" target="_blank" style="color: #0279d9;">تکنوشاپ</a></span>
                    </td>
                  </tr>
                </tfoot>
              </tbody>
            </table>`,
        }, (error) => {
          if (error) {
            throw error;
          } else {
            response.json({ message: "کد تایید با موفقیت به ایمیل شما ارسال شد." });
          }
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

const verify = async (request, response, next) => {
  try {
    const body = Object.fromEntries(Object.entries(request.body).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
    
    await validator.verify.validate(body);

    const otp = await model.findOne({ email: { $regex: new RegExp(`^${body.email}$`, "i") }, isVerified: false });

    if (otp) {
      if (otp.tries < 3) {
        if (otp.expiresAt > new Date()) {
          if (otp.code === body.code) {
            await model.findByIdAndUpdate(otp._id, { isVerified: true });

            response.json({ message: "ایمیل شما با موفقیت تایید شد." });
          } else {
            await model.findByIdAndUpdate(otp._id, { $inc: { tries: 1 } });

            throw Object.assign(new Error("کد تایید وارد شده نامعتبر است."), { status: 401 });
          }
        } else {
          throw Object.assign(new Error("کد تایید وارد شده منقضی شده است."), { status: 410 });
        }
      } else {
        throw Object.assign(new Error("تلاش‌های زیادی برای تایید ایمیل شما انجام شده است."), { status: 429 });
      }
    } else {
      throw Object.assign(new Error("کد تاییدی برای ایمیل شما ارسال نشده است."), { status: 409 });
    }
  } catch (error) {
    next(error);
  }
};

export { send, verify };