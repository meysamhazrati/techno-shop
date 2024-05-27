import model from "../models/favorite.js";
import productModel from "../models/product.js";

const create = async (request, response, next) => {
  try {
    await model.validation(request.body);

    const { product } = request.body;

    const product_ = await productModel.findById(product);

    if (product_) {
      const isExists = await model.findOne({ user: request.user._id, product });

      if (isExists) {
        throw Object.assign(new Error("This favorite has already been added."), { status: 409 });
      } else {
        await model.create({ user: request.user._id, product });

        response.status(201).json({ message: "The favorite has been successfully added." });
      }
    } else {
      throw Object.assign(new Error("The product was not found."), { status: 404 });
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
      response.json({ message: "The favorite has been successfully removed." });
    } else {
      throw Object.assign(new Error("The favorite was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, remove };