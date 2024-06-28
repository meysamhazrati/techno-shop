import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

import userModel from "../models/user.js";
import otpModel from "../models/otp.js";
import validator from "../validators/authentication.js"

const register = async (request, response, next) => {
  try {
    const body = request.body;
    
    await validator.register.validate(body);

    const otp = await otpModel.findOne({ email: { $regex: new RegExp(`^${body.email}$`, "i") } });

    if (otp?.isVerified) {
      await otpModel.findByIdAndDelete(otp._id);

      const usersCount = await userModel.countDocuments();

      const hashedPassword = await hash(body.password, 12);

      const { _id } = await userModel.create({ ...body, password: hashedPassword, role: usersCount ? "USER" : "ADMIN" });

      const token = jwt.sign({ id: _id }, process.env.JWT_SECRET, { expiresIn: "7d" });

      response.cookie("token", token, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      }).status(201).json({ message: "با موفقیت ثبت نام شدید." });
    } else {
      throw Object.assign(new Error("ایمیل شما تایید نشده است."), { status: 401 });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (request, response, next) => {
  try {
    const body = request.body;
    
    await validator.login.validate(body);

    const user = await userModel.findOne({ email: { $regex: new RegExp(`^${body.email}$`, "i") } });

    if (user) {
      if (user.isBanned) {
        throw Object.assign(new Error("ایمیل شما مسدود شده است."), { status: 403 });
      } else {
        const isPasswordValid = await compare(body.password, user.password);
  
        if (isPasswordValid) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
          return response.cookie("token", token, {
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
          }).json({ message: "با موفقیت وارد شدید." });
        }
      }
    }

    throw Object.assign(new Error("ایمیل یا رمز عبور وارد شده نامعتبر است."), { status: 401 });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (request, response, next) => {
  try {
    const body = request.body;
    
    await validator.resetPassword.validate(body);

    const otp = await otpModel.findOne({ email: { $regex: new RegExp(`^${body.email}$`, "i") } });

    if (otp?.isVerified) {
      const { _id, password } = await userModel.findOne({ email: { $regex: new RegExp(`^${body.email}$`, "i") } });

      const isPasswordUsed = await compare(body.password, password);

      if (isPasswordUsed) {
        throw Object.assign(new Error("رمز عبور وارد شده از قبل استفاده شده است."), { status: 409 });
      } else {
        await otpModel.findByIdAndDelete(otp._id);

        const hashedPassword = await hash(body.password, 12);

        await userModel.findByIdAndUpdate(_id, { password: hashedPassword });

        response.json({ message: "رمز عبور شما با موفقیت بازنشانی شد." });
      }
    } else {
      throw Object.assign(new Error("ایمیل شما تایید نشده است."), { status: 401 });
    }
  } catch (error) {
    next(error);
  }
};

const me = async (request, response, next) => {
  try {
    const user = await userModel.findById(request.user._id, "-password -__v").populate([
      { path: "cart", populate: [
        { path: "product", select: "title warranty covers category offer", populate: [
          { path: "category", select: "_id" },
          { path: "offer", select: "percent expiresAt" },
        ] },
        { path: "color", select: "price inventory name code" },
      ] },
      { path: "addresses", select: "-__v", options: { sort: { createdAt: -1 } } },
      { path: "favorites", select: "-__v", populate: [
        { path: "product", select: "title covers", populate: [
          { path: "colors", select: "price inventory", options: { sort: { price: 1 } } },
          { path: "offer", select: "percent expiresAt" },
        ] },
      ] },
      { path: "orders", select: "totalPrice status products._id products.quantity products.product._id products.product.title products.product.covers createdAt", options: { sort: { createdAt: -1 } } },
      { path: "comments", select: "-isBuyer -__v", options: { sort: { createdAt: -1 } }, populate: [
        { path: "product", select: "title covers" },
        { path: "article", select: "title cover" },
      ] },
      { path: "tickets", select: "-__v", match: { ticket: { $exists: false } }, options: { sort: { createdAt: -1 } } },
    ]).lean();

    response.json(user);
  } catch(error) {
    next(error);
  }
};

const logout = async (request, response) => response.cookie("token", "", { path: "/", maxAge: 0 }).json({ message: "با موفقیت خارج شدید." });

export { register, login, resetPassword, me, logout };