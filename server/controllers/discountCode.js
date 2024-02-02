import discountCodeModel from "../models/discountCode.js";
import orderModel from "../models/order.js";

const create = async (request, response, next) => {
  try {
    await discountCodeModel.createValidation(request.body);

    const { code, percent, minimumAmount, maximumUsage, expiresAt, categories } = request.body;

    await discountCodeModel.create({
      code,
      percent,
      minimumAmount,
      maximumUsage,
      expiresAt: Date.now() + 1000 * 60 * 60 * expiresAt,
      creator: request.user._id,
      categories,
    });

    response.status(201).json({ message: "The discount code has been successfully added." });
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const discountCodes = await discountCodeModel.find({}, "-__v").lean();

    if (discountCodes.length) {
      response.json(discountCodes);
    } else {
      throw Object.assign(new Error("No discount code found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const check = async (request, response, next) => {
  try {
    await discountCodeModel.checkValidation(request.body);

    const { code, amount, categories } = request.body;

    const discountCode = await discountCodeModel.findOne({ code });

    if (discountCode) {
      const isIncludes = categories.every((category) => discountCode.categories.includes(category));

      if (isIncludes) {
        if (amount >= discountCode.minimumAmount) {
          const userOrders = await orderModel.find({ buyer: request.user._id });

          const isUsed = userOrders.some((order) => discountCode._id.equals(order.discountCode));

          if (isUsed) {
            throw Object.assign(new Error("You have already used this discount code."), { status: 403 });
          } else {
            if (discountCode.usages < discountCode.maximumUsage) {
              if (discountCode.expiresAt > new Date()) {
                const { _id, percent } = discountCode;

                response.json({ message: "You can use this discount code.",  discountCode: { _id, percent } });
              } else {
                throw Object.assign(new Error("The entered discount code has expired."), { status: 410 });
              }
            } else {
              throw Object.assign(new Error("The maximum usage limit for this discount code has been reached."), { status: 403 });
            }
          }
        } else {
          throw Object.assign(new Error("The total amount of your ordered product(s) is less than the minimum required amount for using this discount."), { status: 409 });
        }
      } else {
        throw Object.assign(new Error("The ordered product(s) don't include this discount."), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("The discount code was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const use = async (request, response, next) => {
  try {
    const { id } = request.params;

    const result = await discountCodeModel.findByIdAndUpdate(id, { $inc: { usages: 1 } });

    if (result) {
      response.json({ message: "The discount code has been successfully used." });
    } else {
      throw Object.assign(new Error("The discount code was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const result = await discountCodeModel.findByIdAndDelete(id);

    if (result) {
      response.json({ message: "The discount code has been successfully removed." });
    } else {
      throw Object.assign(new Error("The discount code was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, check, use, remove };