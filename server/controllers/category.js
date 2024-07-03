import { unlink } from "fs";

import model from "../models/category.js";
import brandModel from "../models/brand.js";
import validator from "../validators/category.js";

const create = async (request, response, next) => {
  try {
    const logo = request.file;
    const body = request.body;
    
    await validator.create.validate({ ...body, logo });

    await model.create({ ...body, logo: logo.filename });

    response.status(201).json({ message: "دسته‌بندی‌ مورد نظر با موفقیت ثبت شد." });
  } catch (error) {
    request.file && unlink(request.file.path, (error) => error && console.error(error));

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

    throw Object.assign(new Error("دسته‌بندی‌ای پیدا نشد."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { title } = request.params;
    const { "products-brands": productsBrands, "products-price": productsPrice = "0-1000000000", "only-available-products": onlyAvailableProducts = false, "only-amazing-products": onlyAmazingProducts = false, "products-sort": productsSort, "products-page": productsPage = 1, "products-length": productsLength } = request.query;

    const productsFilteredBrands = productsBrands?.trim() ? await Promise.all(productsBrands.trim().split(",").map(async (name) => (await brandModel.findOne({ englishName: { $regex: new RegExp(`^${name.split("-").join(" ")}$`, "i") } }))?._id)) : undefined;

    const category = await model.findOne({ englishTitle: { $regex: new RegExp(`^${title.split("-").join(" ")}$`, "i") } }, "-__v").populate({ path: "products", select: "title covers", match: { brand: productsFilteredBrands }, populate: [
      { path: "colors", select: "price sales inventory name code", options: { sort: { price: 1 } } },
      { path: "brand", select: "-__v" },
      { path: "offer", select: "percent expiresAt" },
      { path: "comments", select: "score", match: { isConfirmed: true } },
    ] }).lean();

    if (category) {
      const filteredProducts = category.products.filter(({ colors, offer }) => (offer?.expiresAt > new Date() ? colors[0].price - colors[0].price * (offer.percent / 100) : colors[0].price) >= (productsPrice.split("-")[0] || 0) && (offer?.expiresAt > new Date() ? colors[0].price - colors[0].price * (offer.percent / 100) : colors[0].price) <= (productsPrice.split("-")[1] || 1000000000) && (JSON.parse(onlyAvailableProducts) ? colors[0].inventory !== 0 : true) && (JSON.parse(onlyAmazingProducts) ? offer?.expiresAt > new Date() : true));
      let products = [];
      let totalProducts = 0;
      let nextProductsPage = null;
      
      if (filteredProducts.length) {
        const currentProductsPage = parseInt(productsPage);
        const productsLengthPerPage = parseInt(productsLength) || filteredProducts.length;

        const productsStartIndex = (currentProductsPage - 1) * productsLengthPerPage;
        const productsEndIndex = productsStartIndex + productsLengthPerPage;

        let sortedProducts = [];

        switch (productsSort) {
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

        products = sortedProducts.slice(productsStartIndex, productsEndIndex).map(({ comments, ...product }) => ({ ...product, score: parseFloat((comments.reduce((previous, { score }) => previous + score, 5) / (comments.length + 1) || 5).toFixed(1)) }));
        totalProducts = sortedProducts.length;
        nextProductsPage = productsEndIndex < sortedProducts.length ? currentProductsPage + 1 : null;
      }

      response.json({ ...category, products, totalProducts, nextProductsPage });
    } else {
      throw Object.assign(new Error("دسته‌بندی‌ مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    const { id } = request.params;
    
    const logo = request.file;
    const body = request.body;
    
    await validator.update.validate({ ...body, logo });

    const result = await model.findByIdAndUpdate(id, { ...body, logo: logo?.filename });

    if (result) {
      logo && unlink(`public/images/categories/${result.logo}`, (error) => error && console.error(error));

      response.json({ message: "دسته‌بندی‌ مورد نظر با موفقیت ویرایش شد." });
    } else {
      throw Object.assign(new Error("دسته‌بندی‌ مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    request.file && unlink(request.file.path, (error) => error && console.error(error));

    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const result = await model.findByIdAndDelete(id);

    if (result) {
      unlink(`public/images/categories/${result.logo}`, (error) => error && console.error(error));

      response.json({ message: "دسته‌بندی‌ مورد نظر با موفقیت حذف شد." });
    } else {
      throw Object.assign(new Error("دسته‌بندی‌ مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, update, remove };