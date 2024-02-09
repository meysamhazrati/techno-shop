import { model as model_ } from "mongoose";
import { unlink } from "fs";

import model from "../models/product.js";
import userModel from "../models/user.js";
import orderModel from "../models/order.js";
import commentModel from "../models/comment.js";
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
    await model.createValidation({ ...request.body, ...covers });

    const { type } = request.query;

    if (type) {
      const currentModel = model_(type);

      await currentModel.validation(request.body);

      await currentModel.create({ ...request.body, covers: covers.map((cover) => cover.filename) });

      response.status(201).json({ message: "The product has been successfully added." });
    } else {
      throw Object.assign(new Error("The type query is required."), { status: 400 });
    }
  } catch (error) {
    request.files && request.files.forEach((file) => unlink(file.path, (error) => console.error(error)));

    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { page = 1, length = 6 } = request.query;

    const products = await model.find({}, "title covers colors").populate([
      { path: "brand", select: "-__v" },
      { path: "category", select: "-offer -__v" },
      { path: "offer", select: "percent expiresAt" },
      { path: "comments", select: "score" },
    ]).sort({ createdAt: -1 }).lean();

    if (products.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length);

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageProducts = products.slice(startIndex, endIndex).map(({ comments, ...product }) => ({ ...product, score: parseFloat((comments.reduce((previous, { score }) => previous + score, 5) / (comments.length + 1) || 5).toFixed(1)) }));
      const hasNextPage = endIndex < products.length;

      if (currentPageProducts.length) {
        return response.json({ products: currentPageProducts, hasNextPage, nextPage: hasNextPage ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("No product found."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;

    const product = await model.findById(id, "-__v").populate([
      { path: "brand", select: "-__v" },
      { path: "category", select: "-offer -__v" },
      { path: "offer", select: "-organizer -__v" },
      { path: "comments", select: "-__v", populate: { path: "sender", select: "firstName lastName avatar" } },
    ]).lean();

    if (product) {
      response.json({ ...product, score: parseFloat((product.comments.reduce((previous, { score }) => previous + score, 5) / (product.comments.length + 1) || 5).toFixed(1)) });
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
    const { page = 1, length = 6 } = request.query;

    const products = await model.find({ category: id }, "title covers colors").populate([
      { path: "brand", select: "-__v" },
      { path: "offer", select: "percent expiresAt" },
      { path: "comments", select: "score" },
    ]).sort({ createdAt: -1 }).lean();

    if (products.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length);

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageProducts = products.slice(startIndex, endIndex).map(({ comments, ...product }) => ({ ...product, score: parseFloat((comments.reduce((previous, { score }) => previous + score, 5) / (comments.length + 1) || 5).toFixed(1)) }));
      const hasNextPage = endIndex < products.length;

      if (currentPageProducts.length) {
        return response.json({ products: currentPageProducts, hasNextPage, nextPage: hasNextPage ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("No product found."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const search = async (request, response, next) => {
  try {
    const { title } = request.params;
    const { page = 1, length = 6 } = request.query;

    const products = await model.find({ title: { $regex: new RegExp(title, "i") } }, "title covers colors").populate([
      { path: "brand", select: "-__v" },
      { path: "category", select: "-offer -__v" },
      { path: "offer", select: "percent expiresAt" },
      { path: "comments", select: "score" },
    ]).sort({ createdAt: -1 }).lean();

    if (products.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length);

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageProducts = products.slice(startIndex, endIndex).map(({ comments, ...product }) => ({ ...product, score: parseFloat((comments.reduce((previous, { score }) => previous + score, 5) / (comments.length + 1) || 5).toFixed(1)) }));
      const hasNextPage = endIndex < products.length;

      if (currentPageProducts.length) {
        return response.json({ products: currentPageProducts, hasNextPage, nextPage: hasNextPage ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("No product found."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    await model.updateValidation(request.body);

    const { id } = request.params;
    const { type } = request.query;

    if (type) {
      const currentModel = model_(type);

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

    const result = await model.findByIdAndDelete(id);

    if (result) {
      result.covers.forEach((cover) => unlink(`public/products/${cover}`, (error) => console.error(error)));
      
      await userModel.updateMany({ $or: [{ "cart.product": id }, { favorites: id }] }, { $pull: { cart: { product: id }, favorites: id } });
      await orderModel.deleteMany({ "products.product": id });
      await commentModel.deleteMany({ product: id });

      response.json({ message: "The product has been successfully removed." });
    } else {
      throw Object.assign(new Error("The product was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, getByCategory, search, update, remove };