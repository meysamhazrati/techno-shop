import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

import userModel from "../models/user.js";
import otpModel from "../models/otp.js";
import mailer from "../utilities/mailer.js";

const sendOTP = async (request, response, next) => {
  try {
    await otpModel.sendValidation(request.body);

    const { type = "register" } = request.query;

    const { email } = request.body;

    const isExists = await userModel.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });

    if (isExists && type === "register") {
      throw Object.assign(new Error("This email already exists."), { status: 409 });
    } else if (!isExists && type === "reset-password") {
      throw Object.assign(new Error("This email is invalid."), { status: 409 });
    } else {
      const isBlocked = await otpModel.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") }, tries: 3 });

      if (isBlocked) {
        throw Object.assign(new Error("This email is blocked for a few hours."), { status: 403 });
      } else {
        const activeOTP = await otpModel.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") }, expiresAt: { $gt: new Date() }, isVerified: false });

        let code = null;
        let expiresAt = null;

        if (activeOTP) {
          ({ code, expiresAt } = activeOTP);
        } else {
          await otpModel.deleteOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });

          ({ code, expiresAt } = await otpModel.create({ email }));
        }

        const transporter = mailer();

        transporter.sendMail({
          to: email,
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
                    <p>این کد تا تاریخ <strong>${new Intl.DateTimeFormat("fa", { year: "numeric", month: "2-digit", day: "2-digit" }).format(Date.parse(expiresAt))}</strong> ساعت <strong>${new Intl.DateTimeFormat("fa", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(Date.parse(expiresAt))}</strong> اعتبار دارد.</p>
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
            response.json({ message: "The verification code was sent successfully." });
          }
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

const verifyOTP = async (request, response, next) => {
  try {
    await otpModel.verifyValidation(request.body);

    const { email, code } = request.body;

    const otp = await otpModel.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") }, isVerified: false });

    if (otp) {
      if (otp.tries < 3) {
        if (otp.expiresAt > new Date()) {
          if (otp.code === code) {
            await otpModel.findByIdAndUpdate(otp._id, { isVerified: true });

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
    await userModel.registerValidation(request.body);

    const { firstName, lastName, email, password } = request.body;

    const otp = await otpModel.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });

    if (otp?.isVerified) {
      await otpModel.findByIdAndDelete(otp._id);

      const usersCount = await userModel.countDocuments();

      const hashedPassword = await hash(password, 12);

      const { _id: id } = await userModel.create({
        firstName,
        lastName,
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
    } else {
      throw Object.assign(new Error("This email is not verified."), { status: 401 });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (request, response, next) => {
  try {
    await userModel.loginValidation(request.body);

    const { email, password } = request.body;

    const user = await userModel.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });

    if (user) {
      if (user.isBanned) {
        throw Object.assign(new Error("This email has been banned."), { status: 403 });
      } else {
        const isPasswordValid = await compare(password, user.password);
  
        if (isPasswordValid) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
          return response.cookie("token", token, {
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
          }).json({ message: "You have successfully logged in." });
        }
      }
    }

    throw Object.assign(new Error("The entered email or password is incorrect."), { status: 401 });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (request, response, next) => {
  try {
    await userModel.resetPasswordValidation(request.body);

    const { email, password } = request.body;

    const otp = await otpModel.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });

    if (otp?.isVerified) {
      const { _id, password: oldPassword } = await userModel.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });

      const isPasswordUsed = await compare(password, oldPassword);

      if (isPasswordUsed) {
        throw Object.assign(new Error("This password has already been used."), { status: 409 });
      } else {
        await otpModel.findByIdAndDelete(otp._id);

        const hashedPassword = await hash(password, 12);

        await userModel.findByIdAndUpdate(_id, { password: hashedPassword });

        response.json({ message: "Your password has been successfully reset." });
      }
    } else {
      throw Object.assign(new Error("This email is not verified."), { status: 401 });
    }
  } catch (error) {
    next(error);
  }
};

const me = async (request, response) => {
  try {
    const user = await userModel.findById(request.user._id, "-password -__v").populate([
      { path: "cart", populate: [
        { path: "product", select: "title warranty covers category offer", populate: [
          { path: "category", select: "_id" },
          { path: "offer", select: "percent expiresAt" },
        ] },
        { path: "color", select: "price inventory name code" },
      ] },
      { path: "favorites", select: "title covers", populate: [
        { path: "colors", select: "price inventory name code" },
        { path: "brand", select: "name englishName" },
        { path: "category", select: "title englishTitle" },
        { path: "offer", select: "percent expiresAt" },
      ] },
      { path: "addresses", select: "-__v", options: { sort: { createdAt: -1 } } },
      { path: "orders", select: "totalPrice status products._id products.quantity products.product._id products.product.title products.product.warranty products.product.covers products.color.price products.color.name products.color.code destination.province destination.city destination.body createdAt updatedAt", options: { sort: { createdAt: -1 } } },
      { path: "comments", select: "-isBuyer -__v", options: { sort: { createdAt: -1 } }, populate: [
        { path: "product", select: "title covers" },
        { path: "article", select: "title cover" },
      ] },
      { path: "articles", select: "-__v", options: { sort: { createdAt: -1 } }, populate: { path: "category", select: "title englishTitle" } },
      { path: "tickets", select: "-__v", match: { ticket: { $exists: false } }, options: { sort: { createdAt: -1 } } },
    ]).lean();

    response.json(user);
  } catch(error) {
    next(error);
  }
};

const logout = async (request, response) => response.cookie("token", "", { path: "/", maxAge: 0 }).json({ message: "You have successfully logged out." });

export { sendOTP, verifyOTP, register, login, resetPassword, me, logout };