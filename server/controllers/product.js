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
      throw Object.assign(new Error("The type query is required."), { status: 400 });
    }
  } catch (error) {
    request.files && request.files.forEach((file) => unlink(file.path, (error) => error && console.error(error)));

    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { all = true } = request.query;

    const products = await productModel.find({}, JSON.parse(all) ? "-__v" : "title price inventory warranty covers colors").lean();

    if (products.length) {
      response.json(products);
    } else {
      throw Object.assign(new Error("No product found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;

    const product = await productModel.findById(id, "-__v").lean();

    if (product) {
      response.json(product);
    } else {
      throw Object.assign(new Error("The product was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const getByCategory = async (request, response, next) => {
  try {
    const { id } = request.params;

    const products = await productModel.find({ category: id }, "title price inventory warranty covers colors").lean();

    if (products.length) {
      response.json(products);
    } else {
      throw Object.assign(new Error("No product found."), { status: 404 });
    }
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

      if (result) {
        response.json({ message: "The product has been successfully edited." });
      } else {
        throw Object.assign(new Error("The product was not found."), { status: 404 });
      }
    } else {
      throw Object.assign(new Error("The type query is required."), { status: 400 });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const result = await productModel.findByIdAndDelete(id);

    if (result) {
      result.covers.forEach((cover) => unlink(`public/products/${cover}`, (error) => error && console.error(error)));

      response.json({ message: "The product has been successfully removed." });
    } else {
      throw Object.assign(new Error("The product was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, getByCategory, update, remove };