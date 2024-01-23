import { model } from "mongoose";
import { unlink } from "fs";

import productModel from "../models/product.js";
import mobileModel from "../models/mobile.js";
import tabletModel from "../models/tablet.js";
import laptopModel from "../models/laptop.js";
import monitorModel from "../models/monitor.js";
import caseModel from "../models/case.js";
import mouseModel from "../models/mouse.js";
import keyboardModel from "../models/keyboard.js";
import headphoneModel from "../models/headphone.js";
import smartWatchModel from "../models/smartWatch.js";
import consoleModel from "../models/console.js";

const create = async (request, response, next) => {
  try {
    const covers = request.files;
    await productModel.createValidation({ ...request.body, ...covers });

    const { type } = request.query;

    if (type) {
      const currentModel = model(type);

      await currentModel.validation(request.body);

      await currentModel.create({ ...request.body, covers: covers.map((cover) => cover.filename) });

      response.status(201).json({ message: "The product has been successfully added." });
    } else {
      request.files && request.files.forEach((file) => unlink(file.path, (error) => error && next(error)));

      response.status(400).json({ message: "The type query is required." });
    }
  } catch (error) {
    error.status = 400;
    error.message = "The entered information is not valid.";

    request.files && request.files.forEach((file) => unlink(file.path, (error) => error && next(error)));

    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { all = true } = request.query;

    const products = await productModel.find({}, JSON.parse(all) ? "-__v" : "title price inventory warranty covers colors").lean();

    response.status(products.length ? 200 : 404).json(products.length ? products : { message: "No product found." });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;
    const product = await productModel.findById(id, "-__v").lean();

    response.status(product ? 200 : 404).json(product || { message: "The product was not found." });
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    await productModel.updateValidation(request.body);

    const { id } = request.params;
    const { type } = request.query;

    if (type) {
      const currentModel = model(type);

      await currentModel.validation(request.body);

      const result = await currentModel.findByIdAndUpdate(id, { ...request.body });

      response.status(result ? 200 : 404).json({ message: result ? "The product has been successfully edited." : "The product was not found." });
    } else {
      response.status(400).json({ message: "The type query is required." });
    }
  } catch (error) {
    error.status = 400;
    error.message = "The entered information is not valid.";

    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const result = await productModel.findByIdAndDelete(id);

    result && result.covers.forEach(cover => unlink(`public/products/${cover}`, (error) => error && next(error)));

    response.status(result ? 200 : 404).json({ message: result ? "The product has been successfully removed." : "The product was not found." });
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, update, remove };