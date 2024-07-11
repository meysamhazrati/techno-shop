import model from "../models/favorite.js";
import productModel from "../models/product.js";
import validator from "../validators/favorite.js";

const create = async (request, response, next) => {
  try {
    const body = Object.fromEntries(Object.entries(request.body).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
    
    await validator.validate(body);

    const product = await productModel.findById(body.product);

    if (product) {
      const isExists = await model.findOne({ user: request.user._id, product: body.product });

      if (isExists) {
        throw Object.assign(new Error("علاقه‌مندی مورد نظر از قبل اضافه شده است."), { status: 409 });
      } else {
        await model.create({ user: request.user._id, product: body.product });

        response.status(201).json({ message: "علاقه‌مندی شما با موفقیت اضافه شد." });
      }
    } else {
      throw Object.assign(new Error("محصول مورد نظر پیدا نشد."), { status: 404 });
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
      response.json({ message: "علاقه‌مندی مورد نظر با موفقیت حذف شد." });
    } else {
      throw Object.assign(new Error("علاقه‌مندی مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, remove };