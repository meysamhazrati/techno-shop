import categoryModel from "../models/category.js";

const create = async (request, response, next) => {
  try {
    await categoryModel.validation(request.body);

    const { title, englishTitle } = request.body;

    await categoryModel.create({ title, englishTitle });

    response.status(201).json({ message: "The category has been successfully added." });
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const categories = await categoryModel.find({}, "-__v").lean();

    if (categories.length) {
      response.json(categories);
    } else {
      throw Object.assign(new Error("No category found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;

    const category = await categoryModel.findById(id, "-__v").lean();

    if (category) {
      response.json(category);
    } else {
      throw Object.assign(new Error("The category was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    await categoryModel.validation(request.body);

    const { id } = request.params;
    const { title, englishTitle } = request.body;

    const result = await categoryModel.findByIdAndUpdate(id, { title, englishTitle });

    if (result) {
      response.json({ message: "The category has been successfully edited." });
    } else {
      throw Object.assign(new Error("The category was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const result = await categoryModel.findByIdAndDelete(id);

    if (result) {
      response.json({ message: "The category has been successfully removed." });
    } else {
      throw Object.assign(new Error("The category was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, update, remove };