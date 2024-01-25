import { unlink } from "fs";

import brandModel from "../models/brand.js";

const create = async (request, response, next) => {
  try {
    const logo = request.file;
    await brandModel.createValidation({ ...request.body, logo });

    const { name, englishName } = request.body;

    await brandModel.create({ name, englishName, logo: logo.filename });

    response.status(201).json({ message: "The brand has been successfully added." });
  } catch (error) {
    request.file && unlink(request.file.path, (error) => error && console.error(error));

    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const brands = await brandModel.find({}, "-__v").lean();

    if (brands.length) {
      response.json(brands);
    } else {
      throw Object.assign(new Error("No brand found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    await brandModel.updateValidation(request.body);

    const { id } = request.params;
    const logo = request.file;
    const { name, englishName } = request.body;

    const result = await brandModel.findByIdAndUpdate(id, { name, englishName, logo: logo?.filename });

    if (result) {
      logo && unlink(`public/brands/${result.logo}`, (error) => error && console.error(error));

      response.json({ message: "The brand has been successfully edited." });
    } else {
      throw Object.assign(new Error("The brand was not found."), { status: 404 });
    }
  } catch (error) {
    request.file && unlink(request.file.path, (error) => error && console.error(error));

    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const result = await brandModel.findByIdAndDelete(id);

    if (result) {
      unlink(`public/brands/${result.logo}`, (error) => error && console.error(error));

      response.json({ message: "The brand has been successfully removed." });
    } else {
      throw Object.assign(new Error("The brand was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, update, remove };