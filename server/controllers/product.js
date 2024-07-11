import { unlink } from "fs";

import model from "../models/product.js";
import colorModel from "../models/color.js";
import brandModel from "../models/brand.js";
import categoryModel from "../models/category.js";
import favoriteModel from "../models/favorite.js";
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
import validator from "../validators/product.js";
import mobileValidator from "../validators/mobile.js";
import tabletValidator from "../validators/tablet.js";
import laptopValidator from "../validators/laptop.js";
import monitorValidator from "../validators/monitor.js";
import caseValidator from "../validators/case.js";
import mouseValidator from "../validators/mouse.js";
import keyboardValidator from "../validators/keyboard.js";
import headphoneValidator from "../validators/headphone.js";
import smartWatchValidator from "../validators/smartWatch.js";
import consoleValidator from "../validators/console.js";

const create = async (request, response, next) => {
  try {
    const { type } = request.query;
    
    if (type) {
      const covers = request.files.covers || request.files["covers[]"];
      const body = Object.fromEntries(Object.entries(request.body).map(([key, value]) => [key, typeof value === "string" ? value.trim() :  value]));
  
      await validator.create.validate({ ...body, covers });
      
      let _id = null;

      switch (type) {
        case "Mobile": {
          await mobileValidator.validate(body);
    
          ({ _id } = await mobileModel.create({ ...body, covers: covers.map((cover) => cover.filename) }));
          
          break;
        }
        case "Tablet": {
          await tabletValidator.validate(body);
    
          ({ _id } = await tabletModel.create({ ...body, covers: covers.map((cover) => cover.filename) }));

          break;
        }
        case "Laptop": {
          await laptopValidator.validate(body);
    
          ({ _id } = await laptopModel.create({ ...body, covers: covers.map((cover) => cover.filename) }));

          break;
        }
        case "Monitor": {
          await monitorValidator.validate(body);
    
          ({ _id } = await monitorModel.create({ ...body, covers: covers.map((cover) => cover.filename) }));

          break;
        }
        case "Case": {
          await caseValidator.validate(body);
    
          ({ _id } = await caseModel.create({ ...body, covers: covers.map((cover) => cover.filename) }));

          break;
        }
        case "Mouse": {
          await mouseValidator.validate(body);
    
          ({ _id } = await mouseModel.create({ ...body, covers: covers.map((cover) => cover.filename) }));

          break;
        }
        case "Keyboard": {
          await keyboardValidator.validate(body);
    
          ({ _id } = await keyboardModel.create({ ...body, covers: covers.map((cover) => cover.filename) }));

          break;
        }
        case "Headphone": {
          await headphoneValidator.validate(body);
    
          ({ _id } = await headphoneModel.create({ ...body, covers: covers.map((cover) => cover.filename) }));

          break;
        }
        case "SmartWatch": {
          await smartWatchValidator.validate(body);
    
          ({ _id } = await smartWatchModel.create({ ...body, covers: covers.map((cover) => cover.filename) }));

          break;
        }
        case "Console": {
          await consoleValidator.validate(body);
    
          ({ _id } = await consoleModel.create({ ...body, covers: covers.map((cover) => cover.filename) }));

          break;
        }
        default: {
          throw Object.assign(new Error("نوع محصول نامعتبر است."), { status: 400 });
        }
      }

      await Promise.all(body.colors.map(async (color) => await colorModel.create({ ...color, product: _id })));

      response.status(201).json({ message: "محصول مورد نظر با موفقیت ثبت شد." });
    } else {
      throw Object.assign(new Error("نوع محصول الزامی است."), { status: 400 });
    }
  } catch (error) {
    if (request.files.covers) {
      request.files.covers.forEach((file) => unlink(file.path, (error) => error && console.error(error)));
    } else if (request.files["covers[]"]) {
      request.files["covers[]"].forEach((file) => unlink(file.path, (error) => error && console.error(error)));
    }

    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { search, brands, categories, price = "0-1000000000", "only-available": onlyAvailable = false, "only-amazing": onlyAmazing = false, sort, page = 1, length } = request.query;

    const filteredBrands = brands?.trim() ? await Promise.all(brands.trim().split(",").map(async (name) => (await brandModel.findOne({ englishName: { $regex: new RegExp(`^${name.split("-").join(" ")}$`, "i") } }))?._id)) : undefined;
    const filteredCategories = categories?.trim() ? await Promise.all(categories.trim().split(",").map(async (title) => (await categoryModel.findOne({ englishTitle: { $regex: new RegExp(`^${title.split("-").join(" ")}$`, "i") } }))?._id)) : undefined;

    const products = await model.find({ title: search?.trim() ? { $regex: new RegExp(`${search.trim().split("-").join(" ")}`, "i") } : undefined, brand: filteredBrands, category: filteredCategories }, "title covers createdAt").populate([
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

    throw Object.assign(new Error("محصولی پیدا نشد."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { "only-confirmed-comments": onlyConfirmedComments = false, "comments-page": commentsPage = 1, "comments-length": commentsLength } = request.query;

    const product = await model.findById(id, "-__v").populate([
      { path: "colors", select: "price sales inventory name code", options: { sort: { price: 1 } } },
      { path: "brand", select: "-__v" },
      { path: "category", select: "-__v" },
      { path: "offer", select: "-organizer -__v" },
      { path: "comments", select: "-__v", match: { isConfirmed: JSON.parse(onlyConfirmedComments) ? true : undefined }, options: { sort: { createdAt: -1 } }, populate: { path: "sender", select: "firstName lastName avatar" } },
    ]).lean();

    if (product) {
      const currentCommentsPage = parseInt(commentsPage);
      const commentsLengthPerPage = parseInt(commentsLength) || product.comments.length;

      const commentsStartIndex = (currentCommentsPage - 1) * commentsLengthPerPage;
      const commentsEndIndex = commentsStartIndex + commentsLengthPerPage;

      response.json({ ...product, score: parseFloat((product.comments.reduce((previous, { score }) => previous + score, 5) / (product.comments.length + 1) || 5).toFixed(1)), comments: product.comments.slice(commentsStartIndex, commentsEndIndex), totalComments: product.comments.length, nextCommentsPage: commentsEndIndex < product.comments.length ? currentCommentsPage + 1 : null });
    } else {
      throw Object.assign(new Error("محصول مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { type } = request.query;
    
    if (type) {
      const body = Object.fromEntries(Object.entries(request.body).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));

      await validator.update.validate(body);

      let result = null;
      
      switch (type) {
        case "Mobile": {
          await mobileValidator.validate(body);
    
          result = await mobileModel.findByIdAndUpdate(id, body);
          
          break;
        }
        case "Tablet": {
          await tabletValidator.validate(body);
    
          result = await tabletModel.findByIdAndUpdate(id, body);

          break;
        }
        case "Laptop": {
          await laptopValidator.validate(body);
    
          result = await laptopModel.findByIdAndUpdate(id, body);

          break;
        }
        case "Monitor": {
          await monitorValidator.validate(body);
    
          result = await monitorModel.findByIdAndUpdate(id, body);

          break;
        }
        case "Case": {
          await caseValidator.validate(body);
    
          result = await caseModel.findByIdAndUpdate(id, body);

          break;
        }
        case "Mouse": {
          await mouseValidator.validate(body);
    
          result = await mouseModel.findByIdAndUpdate(id, body);

          break;
        }
        case "Keyboard": {
          await keyboardValidator.validate(body);
    
          result = await keyboardModel.findByIdAndUpdate(id, body);

          break;
        }
        case "Headphone": {
          await headphoneValidator.validate(body);
    
          result = await headphoneModel.findByIdAndUpdate(id, body);

          break;
        }
        case "SmartWatch": {
          await smartWatchValidator.validate(body);
    
          result = await smartWatchModel.findByIdAndUpdate(id, body);

          break;
        }
        case "Console": {
          await consoleValidator.validate(body);
    
          result = await consoleModel.findByIdAndUpdate(id, body);

          break;
        }
        default: {
          throw Object.assign(new Error("نوع محصول نامعتبر است."), { status: 400 });
        }
      }

      if (result) {
        const colors = await Promise.all(body.colors.map(async (color) => await colorModel.findOneAndUpdate({ $or: [{ name: color.name }, { code: color.code }], product: id }, color, { upsert: true, new: true })));

        await colorModel.deleteMany({ _id: { $nin: colors.map(({ _id }) => _id) }, product: id });

        response.json({ message: "محصول مورد نظر با موفقیت ویرایش شد." });
      } else {
        throw Object.assign(new Error("محصول مورد نظر پیدا نشد."), { status: 404 });
      }
    } else {
      throw Object.assign(new Error("نوع محصول الزامی است."), { status: 400 });
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
      result.covers.forEach((cover) => unlink(`public/images/products/${cover}`, (error) => error && console.error(error)));

      await favoriteModel.deleteMany({ product: id });
      await colorModel.deleteMany({ product: id });
      await commentModel.deleteMany({ product: id });

      response.json({ message: "محصول مورد نظر با موفقیت حذف شد." });
    } else {
      throw Object.assign(new Error("محصول مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, update, remove };