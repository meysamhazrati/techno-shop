import orderModel from "../models/order.js";

const create = async (request, response, next) => {
  try {
    await orderModel.validation(request.body);

    const { shippingCost, totalAmount, products, destination, discountCode } = request.body;

    await orderModel.create({
      shippingCost,
      totalAmount,
      products,
      buyer: request.user._id,
      destination,
      discountCode,
    });

    response.status(201).json({ message: "The order has been successfully added." });
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const orders = await orderModel.find({}, "-__v").lean();

    if (orders.length) {
      response.json(orders);
    } else {
      throw Object.assign(new Error("No order found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { user } = request;

    const order = await orderModel.findById(id, "-__v").lean();

    if (order) {
      if (user.role === "ADMIN" || user._id.equals(order.buyer)) {
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

    const order = await orderModel.findById(id);

    if (order) {
      if (order.status === "In progress") {
        await orderModel.findByIdAndUpdate(id, { status: "Delivered" });

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

    const { user } = request;

    const order = await orderModel.findById(id);

    if (order) {
      if (user.role === "ADMIN" || user._id.equals(order.buyer)) {
        if (order.status === "In progress") {
          await orderModel.findByIdAndUpdate(id, { status: "Canceled" });

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

    const { user } = request;

    const order = await orderModel.findById(id);

    if (order) {
      if (user.role === "ADMIN" || user._id.equals(order.buyer)) {
        if (order.status === "Delivered") {
          await orderModel.findByIdAndUpdate(id, { status: "Returned" });

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