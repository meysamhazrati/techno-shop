import { hash, compare } from "bcrypt";
import { unlink } from "fs";

import userModel from "../models/user.js";
import bannedUserModel from "../models/bannedUser.js";

const getAll = async (request, response, next) => {
  try {
    const users = await userModel.find({}, "-password -cart -favorites -__v").lean();

    if(users.length) {
      response.json(users);
    } else {
      throw Object.assign(new Error("No user found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const edit = async (request, response, next) => {
  try {
    await userModel.editValidation(request.body);
    
    const { user } = request;
    const { _id: id } = user;

    const avatar = request.file;
    const { firstName, lastName, currentPassword, newPassword } = request.body;

    let hashedPassword;

    if (currentPassword && newPassword) {
      const { password } = await userModel.findById(id);

      const isPasswordValid = await compare(currentPassword, password);

      if (isPasswordValid) {
        hashedPassword = await hash(newPassword, 12);
      } else {
        throw Object.assign(new Error("The password is incorrect."), { status: 401 });
      }
    }

    await userModel.findByIdAndUpdate(id, {
      firstName,
      lastName,
      password: hashedPassword,
      avatar: avatar?.filename,
    });

    if(avatar && user.avatar !== "user.png") {
      unlink(`public/users/${user.avatar}`, (error) => error && console.error(error));
    }

    response.json({ message: "Your information has been successfully edited." });
  } catch (error) {
    request.file && unlink(request.file.path, (error) => error && console.error(error));

    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    await userModel.updateValidation(request.body);
    
    const { id } = request.params;
    const avatar = request.file;
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
      if(avatar && result.avatar !== "user.png") {
        unlink(`public/users/${result.avatar}`, (error) => error && console.error(error));
      }
      
      response.json({ message: "The user has been successfully edited."});
    } else {
      throw Object.assign(new Error("The user was not found."), { status: 404 });
    }

  } catch (error) {
    request.file && unlink(request.file.path, (error) => error && console.error(error));

    next(error);
  }
};

const ban = async (request, response, next) => {
  try {
    const { id } = request.params;

    const user = await userModel.findById(id);

    if (user) {
      if (user.isBanned) {
        throw Object.assign(new Error("This user has already been banned."), { status: 409 });
      } else {
        const { phone, email } = user;
        
        await bannedUserModel.create({ phone, email });

        await userModel.findByIdAndUpdate(id, { isBanned: true });

        response.json({ message: "The user has been successfully banned." });
      }
    } else {
      throw Object.assign(new Error("The user was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const unban = async (request, response, next) => {
  try {
    const { id } = request.params;

    const user = await userModel.findById(id);

    if (user) {
      if (user.isBanned) {
        const { phone, email } = user;

        await bannedUserModel.findOneAndDelete({ phone, email });

        await userModel.findByIdAndUpdate(id, { isBanned: false });

        response.json({ message: "The user has been successfully unbanned." });
      } else {
        throw Object.assign(new Error("This user has not been banned."), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("The user was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const result = await userModel.findByIdAndDelete(id);

    if(result) {
      result.avatar !== "user.png" && unlink(`public/users/${result.avatar}`, (error) => error && console.error(error));
      
      response.json({ message: "The user has been successfully removed." });
    } else {
      throw Object.assign(new Error("The user was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { getAll, edit, update, ban, unban, remove };