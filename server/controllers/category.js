import model from "../models/category.js";

const create = async (request, response, next) => {
  try {
    const logo = request.file;
    await model.createValidation({ ...request.body, logo });

    const { title, englishTitle } = request.body;

    await model.create({ title, englishTitle, logo: logo.filename });

    response.status(201).json({ message: "The category has been successfully added." });
  } catch (error) {
    request.file && unlink(request.file.path, (error) => console.error(error));

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

const update = async (request, response, next) => {
  try {
    await model.updateValidation(request.body);

    const { id } = request.params;

    const logo = request.file;
    const { title, englishTitle } = request.body;

    const result = await model.findByIdAndUpdate(id, { title, englishTitle, logo: logo?.filename });

    if (result) {
      logo && unlink(`public/categories/${result.logo}`, (error) => console.error(error));

      response.json({ message: "The category has been successfully edited." });
    } else {
      throw Object.assign(new Error("The category was not found."), { status: 404 });
    }
  } catch (error) {
    request.file && unlink(request.file.path, (error) => console.error(error));

    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const result = await model.findByIdAndDelete(id);

    if (result) {
      unlink(`public/categories/${result.logo}`, (error) => console.error(error));

      response.json({ message: "The category has been successfully removed." });
    } else {
      throw Object.assign(new Error("The category was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, update, remove };