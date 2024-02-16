import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

import model from "../models/user.js";
import otpModel from "../models/otp.js";
import mailer from "../utilities/mailer.js";

const send = async (request, response, next) => {
  try {
    await otpModel.sendValidation(request.body);

    const { type } = request.query;

    if (type) {
      if (type === "register" || type === "resetPassword") {
        const { email } = request.body;

        const isExists = await model.findOne({ email });

        if (isExists && type === "register") {
          throw Object.assign(new Error("This email already exists."), { status: 409 });
        } else if (!isExists && type === "resetPassword") {
          throw Object.assign(new Error("The entered email is incorrect."), { status: 409 });
        } else {
          const isBlocked = await otpModel.findOne({ email, tries: 3 });

          if (isBlocked) {
            throw Object.assign(new Error("This email is blocked for a few hours."), { status: 403 });
          } else {
            const activeOTP = await otpModel.findOne({ email, expiresAt: { $gt: new Date() } });

            let code, expiresAt = null;

            if (activeOTP) {
              ({ code, expiresAt } = activeOTP);
            } else {
              await otpModel.deleteOne({ email });

              ({ code, expiresAt } = await otpModel.create({ email }));
            }

            const transporter = mailer();

            transporter.sendMail({
                to: email,
                subject: "تکنوشاپ",
                html: `<table style="max-width: 40rem; color: #3c3f44; font-size: 1rem; font-family: Vazir, Segoe UI; padding: 0 1rem; margin: 0 auto; direction: rtl;">
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
                              <p>این کد تا تاریخ <strong>${expiresAt.toLocaleDateString("fa-IR")}</strong> ساعت <strong>${expiresAt.toLocaleTimeString("fa-IR")}</strong> اعتبار دارد.</p>
                            </td>
                          </tr>
                          <tfoot>
                            <tr>
                              <td>
                                <span style="text-align: center; padding-top: 1rem; margin-top: 1rem; border-top: 1px solid #d6d8db; display: block;">&copy; فروشگاه اینترنتی <a href="https://github.com/meysamhazrati/techno-shop" target="_blank" style="color: #0279d8;">تکنوشاپ</a></span>
                              </td>
                            </tr>
                          </tfoot>
                        </tbody>
                      </table>`,
              },
              (error, info) => {
                if (error) {
                  throw error;
                } else {
                  response.json({ message: "The verification code was sent successfully." });
                }
              }
            );
          }
        }
      } else {
        throw Object.assign(new Error("The entered type query is invalid."), { status: 400 });
      }
    } else {
      throw Object.assign(new Error("The type query is required."), { status: 400 });
    }
  } catch (error) {
    next(error);
  }
};

const verify = async (request, response, next) => {
  try {
    await otpModel.verifyValidation(request.body);

    const { email, code } = request.body;

    const otp = await otpModel.findOne({ email });

    if (otp) {
      if (otp.tries < 3) {
        if (otp.expiresAt > new Date()) {
          if (otp.code === code) {
            await otpModel.deleteOne({ email, code });

            response.json({ message: "Your email has been successfully verified." });
          } else {
            await otpModel.findByIdAndUpdate(otp._id, { $inc: { tries: 1 } });

            throw Object.assign(new Error("The entered verification code is incorrect."), { status: 401 });
          }
        } else {
          throw Object.assign(new Error("The entered verification code has expired."), { status: 410 });
        }
      } else {
        throw Object.assign(new Error("Too many incorrect attempts have been made to verify this email."), { status: 429 });
      }
    } else {
      throw Object.assign(new Error("No verification code has been sent for this email."), { status: 409 });
    }
  } catch (error) {
    next(error);
  }
};

const register = async (request, response, next) => {
  try {
    await model.registerValidation(request.body);

    const { firstName, lastName, phone, email, password } = request.body;

    const isExists = await model.findOne({ $or: [{ phone }, { email }] });

    if (isExists) {
      throw Object.assign(new Error("This phone or email already exists."), { status: 409 });
    } else {
      const usersCount = await model.countDocuments();

      const hashedPassword = await hash(password, 12);

      const { _id: id } = await model.create({
        firstName,
        lastName,
        phone,
        email,
        password: hashedPassword,
        role: usersCount ? "USER" : "ADMIN",
      });

      const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      response.cookie("token", token, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      }).status(201).json({ message: "You have successfully registered." });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (request, response, next) => {
  try {
    await model.loginValidation(request.body);

    const { identifier, password } = request.body;

    const user = await model.findOne({ $or: [{ phone: identifier }, { email: identifier }] });

    if (user) {
      const { _id: id, password: userPassword, isBanned } = user;

      if (isBanned) {
        throw Object.assign(new Error("This phone number or email has been banned."), { status: 403 });
      } else {
        const isPasswordValid = await compare(password, userPassword);

        if (isPasswordValid) {
          const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

          response.cookie("token", token, {
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
          }).json({ message: "You have successfully logged in." });
        } else {
          throw Object.assign(new Error("The entered password is incorrect."), { status: 401 });
        }
      }
    } else {
      throw Object.assign(new Error("The entered phone number or email is incorrect."), { status: 401 });
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (request, response, next) => response.cookie("token", "", { path: "/", maxAge: 0 }).json({ message: "You have successfully logged out." });

const me = async (request, response) => response.json(request.user);

export { send, verify, register, login, logout, me };