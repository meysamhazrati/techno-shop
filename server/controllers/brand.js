import { unlink } from "fs";

import brandModel from "../models/brand.js";

const create = async (request, response, next) => {
  try {
    const logo = request.file;
    await brandModel.validation({ ...request.body, logo });

    const { name, englishName } = request.body;

    await brandModel.create({ name, englishName, logo: logo?.filename });

    response.status(201).json({ message: "The brand has been successfully added." });
  } catch (error) {
    error.status = 400;
    error.message = "The entered information is not valid.";

    request.file && unlink(request.file.path, (error) => error && next(error));

    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const brands = await brandModel.find({}, "-__v").lean();

    response.status(brands.length ? 200 : 404).json(brands.length ? brands : { message: "No brand found." });
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    const logo = request.file;
    await brandModel.validation({ ...request.body, logo });

    const { id } = request.params;
    const { name, englishName } = request.body;

    const result = await brandModel.findByIdAndUpdate(id, { name, englishName, logo: logo?.filename });

    if(result) {
      unlink(`public/brands/${result.logo}`, (error) => error && next(error));
    } else {
      request.file && unlink(request.file.path, (error) => error && next(error));
    }
    
    response.status(result ? 200 : 404).json({ message: result ? "The brand has been successfully edited." : "The brand was not found." });
  } catch (error) {
    error.status = 400;
    error.message = "The entered information is not valid.";

    request.file && unlink(request.file.path, (error) => error && next(error));

    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const result = await brandModel.findByIdAndDelete(id);

    result && unlink(`public/brands/${result.logo}`, (error) => error && next(error));

    response.status(result ? 200 : 404).json({ message: result ? "The brand has been successfully removed." : "The brand was not found." });
  } catch (error) {
    next(error);
  }
};

export { create, getAll, update, remove };