import { unlink } from "fs";

import model from "../models/brand.js";

const create = async (request, response, next) => {
  try {
    const logo = request.file;
    await model.createValidation({ ...request.body, logo });

    const { name, englishName } = request.body;

    await model.create({ name, englishName, logo: logo.filename });

    response.status(201).json({ message: "The brand has been successfully added." });
  } catch (error) {
    request.file && unlink(request.file.path, (error) => console.error(error));

    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { page = 1, length } = request.query;

    const brands = await model.find({}, "-__v").sort({ createdAt: -1 }).lean();

    if (brands.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length) || brands.length;

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageBrands = brands.slice(startIndex, endIndex);

      if (currentPageBrands.length) {
        return response.json({ brands: currentPageBrands, total: brands.length, nextPage: endIndex < brands.length ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("No brand found."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    await model.updateValidation(request.body);

    const { id } = request.params;

    const logo = request.file;
    const { name, englishName } = request.body;

    const result = await model.findByIdAndUpdate(id, { name, englishName, logo: logo?.filename });

    if (result) {
      logo && unlink(`public/brands/${result.logo}`, (error) => console.error(error));

      response.json({ message: "The brand has been successfully edited." });
    } else {
      throw Object.assign(new Error("The brand was not found."), { status: 404 });
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
      unlink(`public/brands/${result.logo}`, (error) => console.error(error));

      response.json({ message: "The brand has been successfully removed." });
    } else {
      throw Object.assign(new Error("The brand was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, update, remove };