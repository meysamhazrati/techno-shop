import model from "../models/category.js";

const create = async (request, response, next) => {
  try {
    await model.validation(request.body);

    const { title, englishTitle } = request.body;

    await model.create({ title, englishTitle });

    response.status(201).json({ message: "The category has been successfully added." });
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { page = 1, length } = request.query;

    const categories = await model.find({}, "-__v").sort({ createdAt: -1 }).lean();

    if (categories.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length) || categories.length;

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageCategories = categories.slice(startIndex, endIndex);

      if (currentPageCategories.length) {
        return response.json({ categories: currentPageCategories, total: categories.length, nextPage: endIndex < categories.length ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("No category found."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { title } = request.params;

    const category = await model.findOne({ englishTitle: { $regex: new RegExp(`^${title.split("-").join(" ")}$`, "i") } }, "-__v").lean();

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
    await model.validation(request.body);

    const { id } = request.params;

    const { title, englishTitle } = request.body;

    const result = await model.findByIdAndUpdate(id, { title, englishTitle });

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

    const result = await model.findByIdAndDelete(id);

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