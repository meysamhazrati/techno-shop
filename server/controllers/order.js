import model from "../models/order.js";
import productModel from "../models/product.js";
import colorModel from "../models/color.js";
import userModel from "../models/user.js";
import addressModel from "../models/address.js";
import discountCodeModel from "../models/discountCode.js";

const create = async (request, response, next) => {
  try {
    await model.validation(request.body);

    const { shippingCost, totalAmount } = request.body;

    const products = await Promise.all(request.body.products.map(async ({ quantity, product, color }) => ({ quantity, product: await productModel.findById(product), color: await colorModel.findById(color) })));

    const hasInventory = products.every(({ quantity, color }) => color.inventory >= quantity);

    if (hasInventory) {
      const buyer = await userModel.findById( request.user._id, "-cart -favorites");
      const destination = await addressModel.findById(request.body.destination);
      const discountCode = await discountCodeModel.findById(request.body.discountCode);

      await model.create({
        shippingCost,
        totalAmount,
        products,
        buyer,
        destination,
        discountCode: discountCode ?? undefined,
      });

      await Promise.all(request.body.products.map(async ({ quantity, color }) => await colorModel.findByIdAndUpdate(color, { $inc: { inventory: -quantity } })));

      response.status(201).json({ message: "The order has been successfully added." });
    } else {
      throw Object.assign(new Error("The product(s) inventory is insufficient."), { status: 409 });
    }
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { page = 1, length } = request.query;

    const orders = await model.find({}, "shippingCost totalAmount status createdAt updatedAt buyer.firstName buyer.lastName").sort({ createdAt: -1 }).lean();

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

    throw Object.assign(new Error("No order found."), { status: 404 });
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
        throw Object.assign(new Error("You don't have access to this order."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("The order was not found."), { status: 404 });
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
      if (order.status === "In progress") {
        await model.findByIdAndUpdate(id, { status: "Delivered" });

        response.json({ message: "The order has been successfully delivered." });
      } else if (order.status === "Delivered") {
        throw Object.assign(new Error("The order has already been delivered."), { status: 409 });
      } else {
        throw Object.assign(new Error(`The order has been ${order.status.toLowerCase()}.`), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("The order was not found."), { status: 404 });
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
        if (order.status === "In progress") {
          await model.findByIdAndUpdate(id, { status: "Canceled" });

          response.json({ message: "The order has been successfully canceled." });
        } else if (order.status === "Canceled") {
          throw Object.assign(new Error("The order has already been canceled."), { status: 409 });
        } else {
          throw Object.assign(new Error(`The order has been ${order.status.toLowerCase()}.`), { status: 409 });
        }
      } else {
        throw Object.assign(new Error("You don't have access to cancel this order."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("The order was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const return_ = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request;

    const order = await model.findById(id);

    if (order) {
      if (role === "ADMIN" || _id.equals(order.buyer)) {
        if (order.status === "Delivered") {
          await model.findByIdAndUpdate(id, { status: "Returned" });

          response.json({ message: "The order has been successfully returned." });
        } else if (order.status === "Returned") {
          throw Object.assign(new Error("The order has already been returned."), { status: 409 });
        } else {
          throw Object.assign(new Error(`The order ${order.status === "In progress" ? "is in progress" : "has been canceled"}.`), { status: 409 });
        }
      } else {
        throw Object.assign(new Error("You don't have access to return this order."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("The order was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, deliver, cancel, return_ };