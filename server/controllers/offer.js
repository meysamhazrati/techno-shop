import offerModel from "../models/offer.js";
import categoryModel from "../models/category.js";
import productModel from "../models/product.js";

const create = async (request, response, next) => {
  try {
    await offerModel.createValidation(request.body);

    const { title, description, percent, expiresAt, categories } = request.body;

    const { _id } = await offerModel.create({
      title,
      description,
      percent,
      expiresAt: Date.now() + 1000 * 60 * 60 * expiresAt,
      organizer: request.user._id,
    });

    await categoryModel.updateMany({ _id: { $in: categories } }, { offer: _id });

    await productModel.updateMany({ category: { $in: categories } }, { offer: _id });

    response.status(201).json({ message: "The offer has been successfully added." });
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const offers = await offerModel.find({}, "-__v").lean();

    if (offers.length) {
      response.json(offers);
    } else {
      throw Object.assign(new Error("No offer found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    await offerModel.updateValidation(request.body);

    const { id } = request.params;
    const { title, description, percent, expiresAt } = request.body;

    const result = await offerModel.findByIdAndUpdate(id, {
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

    const result = await offerModel.findByIdAndDelete(id);

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