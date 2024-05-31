import { hash, compare } from "bcrypt";
import { unlink } from "fs";

import model from "../models/user.js";
import productModel from "../models/product.js";
import colorModel from "../models/color.js";
import addressModel from "../models/address.js";
import favoriteModel from "../models/favorite.js";
import commentModel from "../models/comment.js";
import articleModel from "../models/article.js";
import ticketModel from "../models/ticket.js";

const getAll = async (request, response, next) => {
  try {
    const { page = 1, length } = request.query;

    const users = await model.find({}, "-password -cart -__v").sort({ createdAt: -1 }).lean();

    if (users.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length) || users.length;

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageUsers = users.slice(startIndex, endIndex);

      if (currentPageUsers.length) {
        return response.json({ users: currentPageUsers, total: users.length, nextPage: endIndex < users.length ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("No user found."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;

    const user = await model.findById(id, "-password -cart -__v").populate([
      { path: "addresses", select: "-__v", options: { sort: { createdAt: -1 } } },
      { path: "orders", select: "-products -destination -discountCode -__v", options: { sort: { createdAt: -1 } } },
      { path: "comments", select: "-__v", options: { sort: { createdAt: -1 } }, populate: { path: "product article", select: "title" } },
      { path: "tickets", select: "-body -__v", match: { ticket: { $exists: false } }, options: { sort: { createdAt: -1 } } },
    ]).lean();

    if (user) {
      response.json(user);
    } else {
      throw Object.assign(new Error("The user was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const edit = async (request, response, next) => {
  try {
    await model.editValidation(request.body);

    const { user } = request;
    const { _id: id } = user;

    const avatar = request.file;
    const { firstName, lastName, currentPassword, newPassword } = request.body;

    let hashedPassword;

    if (currentPassword && newPassword) {
      const { password } = await model.findById(id);

      const isPasswordValid = await compare(currentPassword, password);

      if (isPasswordValid) {
        hashedPassword = await hash(newPassword, 12);
      } else {
        throw Object.assign(new Error("The password is incorrect."), { status: 401 });
      }
    }

    await model.findByIdAndUpdate(id, {
      firstName,
      lastName,
      password: hashedPassword,
      avatar: avatar?.filename,
    });

    avatar && unlink(`public/images/users/${user.avatar}`, (error) => console.error(error));

    response.json({ message: "Your information has been successfully edited." });
  } catch (error) {
    request.file && unlink(request.file.path, (error) => console.error(error));

    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    await model.updateValidation(request.body);

    const { id } = request.params;

    const avatar = request.file;
    const { firstName, lastName, email, password, role } = request.body;

    const isExists = await model.findOne({ email, _id: { $ne: id } });

    if (isExists) {
      throw Object.assign(new Error("This email already exists."), { status: 409 });
    } else {
      const hashedPassword = password ? await hash(password, 12) : undefined;

      const result = await model.findByIdAndUpdate(id, {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        avatar: avatar?.filename,
      });

      if (result) {
        avatar && unlink(`public/images/users/${result.avatar}`, (error) => console.error(error));

        response.json({ message: "The user has been successfully edited." });
      } else {
        throw Object.assign(new Error("The user was not found."), { status: 404 });
      }
    }
  } catch (error) {
    request.file && unlink(request.file.path, (error) => console.error(error));

    next(error);
  }
};

const addToCart = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, cart } = request.user;

    const { color } = request.body;

    const product = await productModel.findById(id);
    const productColor = await colorModel.findOne({ _id: color, product: id });

    if (product && productColor) {
      const isExists = cart.find(({ product, color }) => product.equals(id) && color.equals(productColor._id));

      if (isExists) {
        if (productColor.inventory > isExists.quantity) {
          await model.findOneAndUpdate({ _id, "cart._id": isExists._id }, { $inc: { "cart.$.quantity": 1 } });

          return response.json({ message: "The quantity of this product in your cart has been successfully increased." });
        }
      } else {
        if (productColor.inventory >= 1) {
          await model.findByIdAndUpdate(_id, { $push: { cart: { color: productColor, product: id } } });

          return response.json({ message: "The product has been successfully added to your cart." });
        }
      }

      throw Object.assign(new Error("The product inventory is insufficient."), { status: 409 });
    } else {
      throw Object.assign(new Error("The product was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, cart } = request.user;

    const { color } = request.body;

    const product = await productModel.findById(id);
    const productColor = await colorModel.findOne({ _id: color, product: id });

    if (product && productColor) {
      const isExists = cart.find(({ product, color }) => product.equals(id) && color.equals(productColor._id));

      if (isExists) {
        if (isExists.quantity > 1) {
          await model.findOneAndUpdate({ _id, "cart._id": isExists._id }, { $inc: { "cart.$.quantity": -1 } });

          return response.json({ message: "The quantity of this product in your cart has been successfully decreased." });
        } else {
          await model.findByIdAndUpdate(_id, { $pull: { cart: { _id: isExists._id } } });

          return response.json({ message: "The product has been successfully removed from your cart." });
        }
      } else {
        throw Object.assign(new Error("This product doesn't exist in your cart."), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("The product was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const emptyCart = async (request, response, next) => {
  try {
    const { _id, cart } = request.user;

    if (cart.length) {
      await model.findByIdAndUpdate(_id, { $set: { cart: [] } });

      response.json({ message: "Your cart has been successfully emptied." });
    } else {
      throw Object.assign(new Error("Your cart is already empty."), { status: 409, });
    }
  } catch (error) {
    next(error);
  }
};

const ban = async (request, response, next) => {
  try {
    const { id } = request.params;

    const user = await model.findById(id);

    if (user) {
      if (user.isBanned) {
        throw Object.assign(new Error("This user has already been banned."), { status: 409 });
      } else {
        await model.findByIdAndUpdate(id, { isBanned: true });

        response.json({ message: "The user has been successfully banned." });
      }
    } else {
      throw Object.assign(new Error("The user was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const unBan = async (request, response, next) => {
  try {
    const { id } = request.params;

    const user = await model.findById(id);

    if (user) {
      if (user.isBanned) {
        await model.findByIdAndUpdate(id, { isBanned: false });

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

    const result = await model.findByIdAndDelete(id);

    if (result) {
      unlink(`public/images/users/${result.avatar}`, (error) => console.error(error));

      await addressModel.deleteMany({ recipient: id });
      await favoriteModel.deleteMany({ user: id });
      await commentModel.deleteMany({ sender: id });
      await articleModel.deleteMany({ author: id });
      await ticketModel.deleteMany({ sender: id });

      response.json({ message: "The user has been successfully removed." });
    } else {
      throw Object.assign(new Error("The user was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { getAll, get, edit, update, addToCart, removeFromCart, emptyCart, ban, unBan, remove };