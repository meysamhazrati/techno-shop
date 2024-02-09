import model from "../models/offer.js";
import categoryModel from "../models/category.js";
import productModel from "../models/product.js";

const create = async (request, response, next) => {
  try {
    await model.createValidation(request.body);

    const { title, description, percent, expiresAt, categories } = request.body;

    const { _id } = await model.create({
      title,
      description,
      percent,
      expiresAt: Date.now() + 1000 * 60 * 60 * expiresAt,
      organizer: request.user._id,
    });

    await categoryModel.updateMany({ _id: categories }, { offer: _id });

    await productModel.updateMany({ category: categories }, { offer: _id });

    response.status(201).json({ message: "The offer has been successfully added." });
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { page = 1, length = 6 } = request.query;

    const offers = await model.find({}, "-__v").populate({ path: "organizer", select: "firstName lastName" }).sort({ createdAt: -1 }).lean();

    if (offers.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length);

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageOffers = offers.slice(startIndex, endIndex);
      const hasNextPage = endIndex < offers.length;

      if (currentPageOffers.length) {
        return response.json({ offers: currentPageOffers, hasNextPage, nextPage: hasNextPage ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("No offer found."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    await model.updateValidation(request.body);

    const { id } = request.params;

    const { title, description, percent, expiresAt } = request.body;

    const result = await model.findByIdAndUpdate(id, {
      title,
      description,
      percent,
      expiresAt: Date.now() + 1000 * 60 * 60 * expiresAt,
    });

    if (result) {
      response.json({ message: "The offer has been successfully edited." });
    } else {
      throw Object.assign(new Error("The offer was not found."), { status: 404 });
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
      response.json({ message: "The offer has been successfully removed." });
    } else {
      throw Object.assign(new Error("The offer was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, update, remove };