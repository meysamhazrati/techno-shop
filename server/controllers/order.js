import model from "../models/order.js";
import productModel from "../models/product.js";
import colorModel from "../models/color.js";
import userModel from "../models/user.js";
import addressModel from "../models/address.js";
import discountCodeModel from "../models/discountCode.js";
import validator from "../validators/order.js";

const create = async (request, response, next) => {
  try {
    const body = request.body;
    
    await validator.validate(body);

    const products = await Promise.all(body.products.map(async ({ quantity, product, color }) => ({ quantity, product: await productModel.findById(product), color: await colorModel.findById(color) })));
    const buyer = await userModel.findById(request.user._id, "-cart");
    const destination = await addressModel.findById(body.destination);
    const discountCode = await discountCodeModel.findById(body.discountCode);
      
    await model.create({ ...body, products, buyer, destination, discountCode: discountCode ?? undefined });
      
    await userModel.findByIdAndUpdate(request.user._id, { $set: { cart: [] } });
    await Promise.all(body.products.map(async ({ quantity, color }) => await colorModel.findByIdAndUpdate(color, { $inc: { sales: quantity, inventory: -quantity } })));

    response.status(201).json({ message: "سفارش شما با موفقیت ثبت شد." });
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { page = 1, length } = request.query;

    const orders = await model.find({}, "totalPrice status products.quantity buyer._id buyer.firstName buyer.lastName createdAt updatedAt").sort({ createdAt: -1 }).lean();

    if (orders.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length) || orders.length;

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageOrders = orders.slice(startIndex, endIndex);

      if (currentPageOrders.length) {
        return response.json({ orders: currentPageOrders, total: orders.length, nextPage: endIndex < orders.length ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("سفارشی پیدا نشد."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request.user;

    const order = await model.findById(id, "-__v -products.product.__v -products.color.product -products.color.__v -buyer.password -buyer.cart -buyer.favorites -buyer.__v -destination.recipient -destination.__v -discountCode.__v").populate([
      { path: "products.product.brand", select: "name englishName" },
      { path: "products.product.category discountCode.categories", select: "title englishTitle" },
      { path: "products.product.offer", select: "-description -__v", populate: { path: "organizer", select: "firstName lastName" } },
      { path: "discountCode.creator", select: "firstName lastName" },
    ]).lean();

    if (order) {
      if (role === "ADMIN" || _id.equals(order.buyer)) {
        response.json(order);
      } else {
        throw Object.assign(new Error("شما دسترسی لازم به سفارش مورد نظر را ندارید."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("سفارش مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const deliver = async (request, response, next) => {
  try {
    const { id } = request.params;

    const order = await model.findById(id);

    if (order) {
      if (order.status === "جاری") {
        await model.findByIdAndUpdate(id, { status: "تحویل شده" });

        response.json({ message: "سفارش مورد نظر با موفقیت تحویل شد." });
      } else if (order.status === "تحویل شده") {
        throw Object.assign(new Error("سفارش مورد نظر از قبل تحویل شده است."), { status: 409 });
      } else {
        throw Object.assign(new Error(`سفارش مورد نظر ${order.status} است.`), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("سفارش مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const cancel = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request.user;

    const order = await model.findById(id);

    if (order) {
      if (role === "ADMIN" || _id.equals(order.buyer)) {
        if (order.status === "جاری") {
          await model.findByIdAndUpdate(id, { status: "لغو شده" });

          await Promise.all(order.products.map(async ({ quantity, color }) => await colorModel.findByIdAndUpdate(color, { $inc: { sales: -quantity, inventory: quantity } })));

          response.json({ message: "سفارش مورد نظر با موفقیت لغو شد." });
        } else if (order.status === "لغو شده") {
          throw Object.assign(new Error("سفارش مورد نظر از قبل لغو شده است."), { status: 409 });
        } else {
          throw Object.assign(new Error(`سفارش مورد نظر ${order.status} است.`), { status: 409 });
        }
      } else {
        throw Object.assign(new Error("شما دسترسی لازم برای لغو سفارش مورد نظر را ندارید."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("سفارش مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const return_ = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request.user;

    const order = await model.findById(id);

    if (order) {
      if (role === "ADMIN" || _id.equals(order.buyer)) {
        if (order.status === "تحویل شده") {
          await model.findByIdAndUpdate(id, { status: "مرجوع شده" });

          response.json({ message: "سفارش مورد نظر با موفقیت مرجوع شد." });
        } else if (order.status === "مرجوع شده") {
          throw Object.assign(new Error("سفارش مورد نظر از قبل مرجوع شده است."), { status: 409 });
        } else {
          throw Object.assign(new Error(`سفارش مورد نظر ${order.status} است.`), { status: 409 });
        }
      } else {
        throw Object.assign(new Error("شما دسترسی لازم برای مرجوع سفارش مورد نظر را ندارید."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("سفارش مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, deliver, cancel, return_ };