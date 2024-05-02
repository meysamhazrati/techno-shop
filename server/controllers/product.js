import { model as model_ } from "mongoose";
import { unlink } from "fs";

import model from "../models/product.js";
import colorModel from "../models/color.js";
import brandModel from "../models/brand.js";
import categoryModel from "../models/category.js";
import userModel from "../models/user.js";
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
    await model.createValidation({ ...request.body, covers });

    const { type } = request.query;

    if (type) {
      const currentModel = model_(type);

      await currentModel.validation(request.body);

      const { _id } = await currentModel.create({ ...request.body, covers: covers.map((cover) => cover.filename) });

      await Promise.all(request.body.colors.map(async (color) => await colorModel.create({ ...color, product: _id })));

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
    const { search, brands, categories, price = "0-1000000000", "only-available": onlyAvailable = false, "only-amazing": onlyAmazing = false, sort, page = 1, length } = request.query;

    const filteredBrands = brands?.trim() ? await Promise.all(brands.trim().split(",").map(async (name) => (await brandModel.findOne({ englishName: { $regex: new RegExp(`^${name.split("-").join(" ")}$`, "i") } }))?._id)) : undefined;
    const filteredCategories = categories?.trim() ? await Promise.all(categories.trim().split(",").map(async (title) => (await categoryModel.findOne({ englishTitle: { $regex: new RegExp(`^${title.split("-").join(" ")}$`, "i") } }))?._id)) : undefined;

    const products = await model.find({ title: search?.trim() ? { $regex: new RegExp(`${search.trim().split("-").join(" ")}`, "i") } : undefined, brand: filteredBrands, category: filteredCategories }, "title covers").populate([
      { path: "colors", select: "price sales inventory name code", options: { sort: { price: 1 } } },
      { path: "brand", select: "-__v" },
      { path: "category", select: "-__v" },
      { path: "offer", select: "title percent expiresAt" },
      { path: "comments", select: "score", match: { isConfirmed: true } },
    ]).lean();

    const filteredProducts = products.filter(({ colors, offer }) => (offer?.expiresAt > new Date() ? colors[0].price - colors[0].price * (offer.percent / 100) : colors[0].price) >= (price.split("-")[0] || 0) && (offer?.expiresAt > new Date() ? colors[0].price - colors[0].price * (offer.percent / 100) : colors[0].price) <= (price.split("-")[1] || 1000000000) && (JSON.parse(onlyAvailable) ? colors[0].inventory !== 0 : true) && (JSON.parse(onlyAmazing) ? offer?.expiresAt > new Date() : true));
    
    if (filteredProducts.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length) || filteredProducts.length;

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      let sortedProducts = [];

      switch (sort) {
        case "best-seller": {
          sortedProducts = filteredProducts.toSorted((firstProduct, secondProduct) => secondProduct.colors.reduce((previous, { sales }) => previous + sales, 0) - firstProduct.colors.reduce((previous, { sales }) => previous + sales, 0));
          break;
        }
        case "popular": {
          sortedProducts = filteredProducts.toSorted((firstProduct, secondProduct) => parseFloat((secondProduct.comments.reduce((previous, { score }) => previous + score, 5) / (secondProduct.comments.length + 1) || 5).toFixed(1)) - parseFloat((firstProduct.comments.reduce((previous, { score }) => previous + score, 5) / (firstProduct.comments.length + 1) || 5).toFixed(1)));
          break;
        }
        case "cheap": {
          sortedProducts = filteredProducts.toSorted((firstProduct, secondProduct) => (firstProduct.offer?.expiresAt > new Date() ? firstProduct.colors[0].price - firstProduct.colors[0].price * (firstProduct.offer.percent / 100) : firstProduct.colors[0].price) - (secondProduct.offer?.expiresAt > new Date() ? secondProduct.colors[0].price - secondProduct.colors[0].price * (secondProduct.offer.percent / 100) : secondProduct.colors[0].price));
          break;
        }
        case "expensive": {
          sortedProducts = filteredProducts.toSorted((firstProduct, secondProduct) => (secondProduct.offer?.expiresAt > new Date() ? secondProduct.colors[0].price - secondProduct.colors[0].price * (secondProduct.offer.percent / 100) : secondProduct.colors[0].price) - (firstProduct.offer?.expiresAt > new Date() ? firstProduct.colors[0].price - firstProduct.colors[0].price * (firstProduct.offer.percent / 100) : firstProduct.colors[0].price));
          break;
        }
        default: {
          sortedProducts = filteredProducts.toSorted((firstProduct, secondProduct) => secondProduct.createdAt - firstProduct.createdAt);
          break;
        }
      }

      const currentPageProducts = sortedProducts.slice(startIndex, endIndex).map(({ comments, ...product }) => ({ ...product, score: parseFloat((comments.reduce((previous, { score }) => previous + score, 5) / (comments.length + 1) || 5).toFixed(1)) }));

      if (currentPageProducts.length) {
        return response.json({ products: currentPageProducts, total: sortedProducts.length, nextPage: endIndex < sortedProducts.length ? currentPage + 1 : null });
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
    const { "comments-page": commentsPage = 1, "comments-length": commentsLength } = request.query;

    const product = await model.findById(id, "-__v").populate([
      { path: "colors", select: "price sales inventory name code", options: { sort: { price: 1 } } },
      { path: "brand", select: "-__v" },
      { path: "category", select: "-__v" },
      { path: "offer", select: "-organizer -__v" },
      { path: "comments", select: "-__v", match: { isConfirmed: true }, options: { sort: { createdAt: -1 } }, populate: { path: "sender", select: "firstName lastName avatar" } },
    ]).lean();

    if (product) {
      const currentCommentsPage = parseInt(commentsPage);
      const commentsLengthPerPage = parseInt(commentsLength) || product.comments.length;

      const commentsStartIndex = (currentCommentsPage - 1) * commentsLengthPerPage;
      const commentsEndIndex = commentsStartIndex + commentsLengthPerPage;

      response.json({ ...product, score: parseFloat((product.comments.reduce((previous, { score }) => previous + score, 5) / (product.comments.length + 1) || 5).toFixed(1)), comments: product.comments.slice(commentsStartIndex, commentsEndIndex), totalComments: product.comments.length, nextCommentsPage: commentsEndIndex < product.comments.length ? currentCommentsPage + 1 : null });
    } else {
      throw Object.assign(new Error("The product was not found."), { status: 404 });
    }
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
        const colors = await Promise.all(request.body.colors.map(async ({ price, sales = 0, inventory, name, code }) => await colorModel.findOneAndUpdate({ $or: [{ name }, { code }], product: id }, { price, sales, inventory, name, code }, { upsert: true, new: true })));

        await colorModel.deleteMany({ _id: { $nin: colors.map(({ _id }) => _id) }, product: id });

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
      await colorModel.deleteMany({ product: id });
      await commentModel.deleteMany({ product: id });

      response.json({ message: "The product has been successfully removed." });
    } else {
      throw Object.assign(new Error("The product was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, update, remove };