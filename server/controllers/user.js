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
import validator from "../validators/user.js";

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

    throw Object.assign(new Error("کاربری پیدا نشد."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;

    const user = await model.findById(id, "-password -cart -__v").populate([
      { path: "addresses", select: "-__v", options: { sort: { createdAt: -1 } } },
      { path: "orders", select: "totalPrice status products.quantity buyer._id createdAt", options: { sort: { createdAt: -1 } } },
      { path: "comments", select: "-__v", options: { sort: { createdAt: -1 } }, populate: { path: "product article", select: "title" } },
      { path: "tickets", select: "-body -__v", match: { ticket: { $exists: false } }, options: { sort: { createdAt: -1 } } },
    ]).lean();

    if (user) {
      response.json(user);
    } else {
      throw Object.assign(new Error("کاربر مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const edit = async (request, response, next) => {
  try {
    const { _id } = request.user;

    const avatar = request.file;
    const body = request.body;

    await validator.edit.validate(body);
    
    let hashedPassword;

    if (body.currentPassword && body.newPassword) {
      const { password } = await model.findById(_id);

      const isPasswordValid = await compare(body.currentPassword, password);

      if (isPasswordValid) {
        hashedPassword = await hash(body.newPassword, 12);
      } else {
        throw Object.assign(new Error("رمز عبور فعلی وارد شده نامعتبر است."), { status: 401 });
      }
    }

    const result = await model.findByIdAndUpdate(_id, { ...body, avatar: avatar?.filename, password: hashedPassword });

    avatar && unlink(`public/images/users/${result.avatar}`, (error) => error && console.error(error));

    response.json({ message: "اطلاعات شما با موفقیت ویرایش شد." });
  } catch (error) {
    request.file && unlink(request.file.path, (error) => error && console.error(error));

    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    const { id } = request.params;
    
    const avatar = request.file;
    const body = request.body;
    
    await validator.update.validate(body);

    const isExists = await model.findOne({ _id: { $ne: id }, email: body.email });

    if (isExists) {
      throw Object.assign(new Error("ایمیل وارد شده از قبل وجود دارد."), { status: 409 });
    } else {
      const hashedPassword = body.password ? await hash(body.password, 12) : undefined;

      const result = await model.findByIdAndUpdate(id, { ...body, avatar: avatar?.filename, password: hashedPassword });

      if (result) {
        avatar && unlink(`public/images/users/${result.avatar}`, (error) => error && console.error(error));

        response.json({ message: "کاربر مورد نظر با موفقیت ویرایش شد." });
      } else {
        throw Object.assign(new Error("کاربر مورد نظر پیدا نشد."), { status: 404 });
      }
    }
  } catch (error) {
    request.file && unlink(request.file.path, (error) => error && console.error(error));

    next(error);
  }
};

const addToCart = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, cart } = request.user;

    const body = request.body;

    await validator.cart.validate(body);

    const product = await productModel.findById(id);
    const color = await colorModel.findOne({ _id: body.color, product: id });

    if (product && color) {
      const isExists = cart.find(({ product, color: color_ }) => product.equals(id) && color_.equals(color._id));

      if (isExists) {
        if (color.inventory > isExists.quantity) {
          await model.findOneAndUpdate({ _id, "cart._id": isExists._id }, { $inc: { "cart.$.quantity": 1 } });

          return response.json({ message: "تعداد محصول مورد نظر با موفقیت در سبد خرید شما افزایش پیدا کرد." });
        }
      } else {
        if (color.inventory >= 1) {
          await model.findByIdAndUpdate(_id, { $push: { cart: { color: color, product: id } } });

          return response.json({ message: "محصول مورد نظر با موفقیت به سبد خرید شما اضافه شد." });
        }
      }

      throw Object.assign(new Error("موجودی محصول مورد نظر کافی نمی‌باشد."), { status: 409 });
    } else {
      throw Object.assign(new Error("محصول مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, cart } = request.user;

    const body = request.body;
    
    await validator.cart.validate(body);

    const product = await productModel.findById(id);
    const color = await colorModel.findOne({ _id: body.color, product: id });

    if (product && color) {
      const isExists = cart.find(({ product, color: color_ }) => product.equals(id) && color_.equals(color._id));

      if (isExists) {
        if (isExists.quantity > 1) {
          await model.findOneAndUpdate({ _id, "cart._id": isExists._id }, { $inc: { "cart.$.quantity": -1 } });

          return response.json({ message: "تعداد محصول مورد نظر با موفقیت در سبد خرید شما کاهش پیدا کرد." });
        } else {
          await model.findByIdAndUpdate(_id, { $pull: { cart: { _id: isExists._id } } });

          return response.json({ message: "محصول مورد نظر با موفقیت از سبد خرید شما حذف شد." });
        }
      } else {
        throw Object.assign(new Error("محصول مورد نظر در سبد خرید شما وجود ندارد."), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("محصول مورد نظر پیدا نشد."), { status: 404 });
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

      response.json({ message: "سبد خرید شما با موفقیت خالی شد." });
    } else {
      throw Object.assign(new Error("سبد خرید شما از قبل خالی است."), { status: 409, });
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
        throw Object.assign(new Error("کاربر مورد نظر از قبل ممنوع شده است."), { status: 409 });
      } else {
        await model.findByIdAndUpdate(id, { isBanned: true });

        response.json({ message: "کاربر مورد نظر با موفقیت ممنوع شد." });
      }
    } else {
      throw Object.assign(new Error("کاربر مورد نظر پیدا نشد."), { status: 404 });
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

        response.json({ message: "کاربر مورد نظر با موفقیت آزاد شد." });
      } else {
        throw Object.assign(new Error("کاربر مورد نظر ممنوع نشده است."), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("کاربر مورد نظر پیدا نشد."), { status: 404 });
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
      unlink(`public/images/users/${result.avatar}`, (error) => error && console.error(error));

      await addressModel.deleteMany({ recipient: id });
      await favoriteModel.deleteMany({ user: id });
      await commentModel.deleteMany({ sender: id });
      await articleModel.deleteMany({ author: id });
      await ticketModel.deleteMany({ sender: id });

      response.json({ message: "کاربر مورد نظر با موفقیت حذف شد." });
    } else {
      throw Object.assign(new Error("کاربر مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { getAll, get, edit, update, addToCart, removeFromCart, emptyCart, ban, unBan, remove };