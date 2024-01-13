import categoryModel from "../models/category.js";

const create = async (request, response, next) => {
  try {
    await categoryModel.validation(request.body);

    const { title, englishTitle } = request.body;

    await categoryModel.create({ title, englishTitle });

    response.status(201).json({ message: "The category has been successfully added." });
  } catch (error) {
    error.status = 400;
    error.message = "The entered information is not valid.";

    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const categories = await categoryModel.find({}, "-__v").lean();

    response.status(categories.length ? 200 : 404).json(categories.length ? categories : { message: "No category found." });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;

    const category = await categoryModel.findById(id, "-__v").lean();

    response.status(category ? 200 : 404).json(category || { message: "The category was not found." });
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    await categoryModel.validation(request.body);

    const { id } = request.params;
    const { title, englishTitle } = request.body;

    const result = await categoryModel.findByIdAndUpdate(id, {
      title,
      englishTitle,
    });

    response.status(result ? 200 : 404).json({ message: result ? "The category has been successfully edited." : "The category was not found." });
  } catch (error) {
    error.status = 400;
    error.message = "The entered information is not valid.";
    
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const result = await categoryModel.findByIdAndDelete(id);

    response.status(result ? 200 : 404).json({ message: result ? "The category has been successfully removed." : "The category was not found." });
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, update, remove };