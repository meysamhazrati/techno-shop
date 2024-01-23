import { hash, compare } from "bcrypt";
import { unlink } from "fs";

import userModel from "../models/user.js";
import bannedUserModel from "../models/bannedUser.js";

const getAll = async (request, response, next) => {
  try {
    const users = await userModel.find({}, "-password -favorites -__v").lean();

    response.status(users.length ? 200 : 404).json(users.length ? users : { message: "No user found." });
  } catch (error) {
    next(error);
  }
};

const edit = async (request, response, next) => {
  try {
    const avatar = request.file;
    await userModel.editValidation({ ...request.body, avatar });

    const { user } = request;
    const { _id: id } = user;
    const { firstName, lastName, currentPassword, newPassword } = request.body;

    let hashedPassword;

    if (currentPassword && newPassword) {
      const { password } = await userModel.findById(id).lean();

      const isPasswordValid = await compare(currentPassword, password);

      if (isPasswordValid) {
        hashedPassword = await hash(newPassword, 12);
      } else {
        request.file && unlink(request.file.path, (error) => error && next(error));

        return response.status(401).json({ message: "The password is incorrect." });
      }
    }

    await userModel.findByIdAndUpdate(id, {
      firstName,
      lastName,
      password: hashedPassword,
      avatar: avatar?.filename,
    });

    user.avatar !== "user.png" && unlink(`public/users/${user.avatar}`, (error) => error && next(error));

    response.json({ message: "Your information has been successfully edited." });
  } catch (error) {
    error.status = 400;
    error.message = "The entered information is not valid.";

    request.file && unlink(request.file.path, (error) => error && next(error));

    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    const avatar = request.file;
    await userModel.updateValidation({ ...request.body, avatar });

    const { id } = request.params;
    const { firstName, lastName, phone, email, password, role } = request.body;

    const hashedPassword = password ? await hash(password, 12) : undefined;

    const result = await userModel.findByIdAndUpdate(id, {
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
      role,
      avatar: avatar?.filename,
    });

    if(result) {
      result.avatar !== "user.png" && unlink(`public/users/${result.avatar}`, (error) => error && next(error));
    } else {
      request.file && unlink(request.file.path, (error) => error && next(error));
    }

    response.status(result ? 200 : 404).json({ message: result ? "The user has been successfully edited." : "The user was not found." });
  } catch (error) {
    error.status = 400;
    error.message = "The entered information is not valid.";

    request.file && unlink(request.file.path, (error) => error && next(error));

    next(error);
  }
};

const ban = async (request, response, next) => {
  try {
    const { id } = request.params;

    const user = await userModel.findById(id).lean();

    if (user) {
      if (user.isBanned) {
        response.status(409).json({ message: "This user has already been banned." });
      } else {
        const { phone, email } = user;
        
        await bannedUserModel.create({ phone, email });

        await userModel.findByIdAndUpdate(id, { isBanned: true });

        response.status(200).json({ message: "The user has been successfully banned." });
      }
    } else {
      response.status(404).json({ message: "The user was not found." });
    }
  } catch (error) {
    next(error);
  }
};

const unban = async (request, response, next) => {
  try {
    const { id } = request.params;

    const user = await userModel.findById(id).lean();

    if (user) {
      if (user.isBanned) {
        const { phone, email } = user;

        await bannedUserModel.findOneAndDelete({ phone, email });

        await userModel.findByIdAndUpdate(id, { isBanned: false });

        response.status(200).json({ message: "The user has been successfully unbanned." });
      } else {
        response.status(409).json({ message: "This user has not been banned." });
      }
    } else {
      response.status(404).json({ message: "The user was not found." });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const result = await userModel.findByIdAndDelete(id).lean();

    if(result && result.avatar !== "user.png") {
      unlink(`public/users/${result.avatar}`, (error) => error && next(error));
    }

    response.status(result ? 200 : 404).json({ message: result ? "The user has been successfully removed." : "The user was not found." });
  } catch (error) {
    next(error);
  }
};

export { getAll, edit, update, ban, unban, remove };