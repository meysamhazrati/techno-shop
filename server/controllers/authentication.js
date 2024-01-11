import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

import userModel from "../models/user.js";
import bannedUserModel from "../models/bannedUser.js";

const register = async (request, response, next) => {
  try {
    await userModel.registerValidation(request.body);

    const { firstName, lastName, phone, email, password } = request.body;

    const isExists = await userModel.findOne({ $or: [{ phone }, { email }] }).lean();

    if (isExists) {
      response.status(409).json({ message: "This phone or email already exists." });
    } else {
      const isBanned = await bannedUserModel.findOne({ $or: [{ phone }, { email }] }).lean();

      if (isBanned) {
        response.status(403).json({ message: "This phone number or email has been banned." });
      } else {
        const usersCount = await userModel.countDocuments();
        const hashedPassword = await hash(password, 12);

        const { _id: id } = await userModel.create({
          firstName,
          lastName,
          phone,
          email,
          password: hashedPassword,
          role: usersCount ? "USER" : "ADMIN",
        });

        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        response
          .cookie("token", token, {
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
          })
          .status(201)
          .json({ message: "You have successfully registered." });
      }
    }
  } catch (error) {
    error.status = 400;
    error.message = "The entered information is not valid.";

    next(error);
  }
};

const login = async (request, response, next) => {
  try {
    await userModel.loginValidation(request.body);

    const { identifier, password } = request.body;

    const user = await userModel.findOne({ $or: [{ phone: identifier }, { email: identifier }] }).lean();

    if (user) {
      const { _id: id, password: userPassword, isBanned } = user;

      if (isBanned) {
        response.status(403).json({ message: "This phone number or email has been banned." });
      } else {
        const isPasswordValid = await compare(password, userPassword);

        if (isPasswordValid) {
          const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

          response
            .cookie("token", token, {
              path: "/",
              maxAge: 1000 * 60 * 60 * 24 * 30,
              httpOnly: true,
            })
            .status(201)
            .json({ message: "You have successfully logged in." });
        } else {
          response.status(401).json({ message: "The password is incorrect." });
        }
      }
    } else {
      response.status(401).json({ message: "The phone number or email is incorrect." });
    }
  } catch (error) {
    error.status = 400;
    error.message = "The entered information is not valid.";

    next(error);
  }
};

const me = async (request, response) => response.json(request.user);

export { register, login, me };