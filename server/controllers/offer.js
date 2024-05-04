import model from "../models/offer.js";
import productModel from "../models/product.js";
import brandModel from "../models/brand.js";
import categoryModel from "../models/category.js";

const create = async (request, response, next) => {
  try {
    await model.createValidation(request.body);

    const { title, englishTitle, description, percent, expiresAt, categories } = request.body;

    const { _id } = await model.create({
      title,
      englishTitle,
      description,
      percent,
      expiresAt: Date.now() + 1000 * 60 * 60 * expiresAt,
      organizer: request.user._id,
    });

    await productModel.updateMany({ category: categories }, { offer: _id });

    response.status(201).json({ message: "The offer has been successfully added." });
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { page = 1, length } = request.query;

    const offers = await model.find({}, "-__v").populate({ path: "organizer", select: "firstName lastName" }).sort({ createdAt: -1 }).lean();

    if (offers.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length) || offers.length;

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageOffers = offers.slice(startIndex, endIndex);

      if (currentPageOffers.length) {
        return response.json({ offers: currentPageOffers, total: offers.length, nextPage: endIndex < offers.length ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("No offer found."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { title } = request.params;
    const { "products-brands": productsBrands, "products-categories": productsCategories, "products-price": productsPrice = "0-1000000000", "only-available-products": onlyAvailableProducts = false, "products-sort": productsSort, "products-page": productsPage = 1, "products-length": productsLength } = request.query;

    const productsFilteredBrands = productsBrands?.trim() ? await Promise.all(productsBrands.trim().split(",").map(async (name) => (await brandModel.findOne({ englishName: { $regex: new RegExp(`^${name.split("-").join(" ")}$`, "i") } }))?._id)) : undefined;
    const productsFilteredCategories = productsCategories?.trim() ? await Promise.all(productsCategories.trim().split(",").map(async (title) => (await categoryModel.findOne({ englishTitle: { $regex: new RegExp(`^${title.split("-").join(" ")}$`, "i") } }))?._id)) : undefined;

    const offer = await model.findOne({ englishTitle: { $regex: new RegExp(`^${title.split("-").join(" ")}$`, "i") } }, "-__v").populate({ path: "products", select: "title covers", match: { brand: productsFilteredBrands, category: productsFilteredCategories }, populate: [
      { path: "colors", select: "price sales inventory name code", options: { sort: { price: 1 } } },
      { path: "brand", select: "-__v" },
      { path: "category", select: "-__v" },
      { path: "comments", select: "score", match: { isConfirmed: true } },
    ] }).lean();

    if (offer && offer.expiresAt > new Date()) {
      const filteredProducts = offer.products.filter(({ colors, offer }) => (offer?.expiresAt > new Date() ? colors[0].price - colors[0].price * (offer.percent / 100) : colors[0].price) >= (productsPrice.split("-")[0] || 0) && (offer?.expiresAt > new Date() ? colors[0].price - colors[0].price * (offer.percent / 100) : colors[0].price) <= (productsPrice.split("-")[1] || 1000000000) && (JSON.parse(onlyAvailableProducts) ? colors[0].inventory !== 0 : true));
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

      response.json({ ...offer, products, totalProducts, nextProductsPage });
    } else {
      throw Object.assign(new Error("The offer was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    await model.updateValidation(request.body);

    const { id } = request.params;

    const { title, englishTitle, description, percent, expiresAt } = request.body;

    const result = await model.findByIdAndUpdate(id, {
      title,
      englishTitle,
      description,
      percent,
      expiresAt: Date.now() + 1000 * 60 * 60 * expiresAt,
    });

    if (result) {
      response.json({ message: "The offer has been successfully edited." });
    } else {
      throw Object.assign(new Error("The offer was not found."), { status: 404 });
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
      await productModel.findOneAndUpdate({ offer: id }, { $unset: { offer: true } });

      response.json({ message: "The offer has been successfully removed." });
    } else {
      throw Object.assign(new Error("The offer was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, update, remove };