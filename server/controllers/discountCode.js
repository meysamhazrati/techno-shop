import model from "../models/discountCode.js";

const create = async (request, response, next) => {
  try {
    await model.createValidation(request.body);

    const { code, percent, minimumPrice, maximumUsage, expiresAt, categories } = request.body;

    await model.create({
      code,
      percent,
      minimumPrice,
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
    const { page = 1, length } = request.query;

    const discountCodes = await model.find({}, "-categories -__v").populate({ path: "creator", select: "firstName lastName" }).sort({ createdAt: -1 }).lean();

    if (discountCodes.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length) || discountCodes.length;

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageDiscountCodes = discountCodes.slice(startIndex, endIndex);

      if (currentPageDiscountCodes.length) {
        return response.json({ discountCodes: currentPageDiscountCodes, total: discountCodes.length, nextPage: endIndex < discountCodes.length ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("No discount code found."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const use = async (request, response, next) => {
  try {
    await model.useValidation(request.body);

    const { code } = request.params;

    const { price, categories } = request.body;

    const discountCode = await model.findOne({ code });

    if (discountCode) {
      const isIncludes = categories.every((category) => discountCode.categories.includes(category));

      if (isIncludes) {
        if (price >= discountCode.minimumPrice) {
          if (discountCode.usages < discountCode.maximumUsage) {
            if (discountCode.expiresAt > new Date()) {
              await model.findByIdAndUpdate(discountCode._id, { $inc: { usages: 1 } });

              response.json({ message: "The discount code has been successfully used.", discountCode });
            } else {
              throw Object.assign(new Error("The entered discount code has expired."), { status: 410 });
            }
          } else {
              throw Object.assign(new Error("The maximum usage limit for this discount code has been reached."), { status: 403 });
          }
        } else {
          throw Object.assign(new Error("The total price of the product(s) is less than the minimum required price for using this discount code."), { status: 409 });
        }
      } else {
        throw Object.assign(new Error("The entered discount code doesn't include this product(s)."), { status: 409 });
      }
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

    const result = await model.findByIdAndDelete(id);

    if (result) {
      response.json({ message: "The discount code has been successfully removed." });
    } else {
      throw Object.assign(new Error("The discount code was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, use, remove };