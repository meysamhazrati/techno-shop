import { unlink } from "fs";

import model from "../models/article.js";
import categoryModel from "../models/category.js";
import commentModel from "../models/comment.js";
import validator from "../validators/article.js"

const create = async (request, response, next) => {
  try {
    const cover = request.file;
    const body = request.body;
    
    await validator.create.validate({ ...body, cover });

    await model.create({ ...body, cover: cover.filename, author: request.user._id });

    response.status(201).json({ message: `مقاله مورد نظر با موفقیت ثبت و ${JSON.parse(body.isPublished) ? "منتشر" : "پیش‌نویس"} شد.` });
  } catch (error) {
    request.file && unlink(request.file.path, (error) => error && console.error(error));

    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { categories, "only-published": onlyPublished = false, sort, page = 1, length } = request.query;

    const filteredCategories = categories?.trim() ? await Promise.all(categories.trim().split(",").map(async (title) => (await categoryModel.findOne({ englishTitle: { $regex: new RegExp(`^${title.split("-").join(" ")}$`, "i") } }))?._id)) : undefined;

    const articles = await model.find({ isPublished: JSON.parse(onlyPublished) || undefined, category: filteredCategories }, "-body -__v").populate([
      { path: "author", select: "firstName lastName avatar" },
      { path: "category", select: "-__v" },
      { path: "comments", select: "score", match: { isConfirmed: true } },
    ]).lean();

    if (articles.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length) || articles.length;

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      let sortedArticles = [];

      switch (sort) {
        case "oldest": {
          sortedArticles = articles.toSorted((firstArticle, secondArticle) => firstArticle.createdAt - secondArticle.createdAt);
          break;
        }
        case "popular": {
          sortedArticles = articles.toSorted((firstArticle, secondArticle) => parseFloat((secondArticle.comments.reduce((previous, { score }) => previous + score, 5) / (secondArticle.comments.length + 1) || 5).toFixed(1)) - parseFloat((firstArticle.comments.reduce((previous, { score }) => previous + score, 5) / (firstArticle.comments.length + 1) || 5).toFixed(1)));
          break;
        }
        default: {
          sortedArticles = articles.toSorted((firstArticle, secondArticle) => secondArticle.createdAt - firstArticle.createdAt);
          break;
        }
      }

      const currentPageArticles = sortedArticles.slice(startIndex, endIndex).map(({ comments, ...article }) => ({ ...article, score: parseFloat((comments.reduce((previous, { score }) => previous + score, 5) / (comments.length + 1) || 5).toFixed(1)) }));

      if (currentPageArticles.length) {
        return response.json({ articles: currentPageArticles, total: sortedArticles.length, nextPage: endIndex < sortedArticles.length ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("مقاله‌ای پیدا نشد."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { "comments-page": commentsPage = 1, "comments-length": commentsLength } = request.query;

    const article = await model.findById(id, "-__v").populate([
      { path: "author", select: "firstName lastName avatar" },
      { path: "category", select: "-__v" },
      { path: "comments", select: "-__v", match: { isConfirmed: true }, options: { sort: { createdAt: -1 } }, populate: { path: "sender", select: "firstName lastName avatar" } },
    ]).lean();

    if (article) {
      const currentCommentsPage = parseInt(commentsPage);
      const commentsLengthPerPage = parseInt(commentsLength) || article.comments.length;

      const commentsStartIndex = (currentCommentsPage - 1) * commentsLengthPerPage;
      const commentsEndIndex = commentsStartIndex + commentsLengthPerPage;

      response.json({ ...article, score: parseFloat((article.comments.reduce((previous, { score }) => previous + score, 5) / (article.comments.length + 1) || 5).toFixed(1)), comments: article.comments.slice(commentsStartIndex, commentsEndIndex), totalComments: article.comments.length, nextCommentsPage: commentsEndIndex < article.comments.length ? currentCommentsPage + 1 : null });
    } else {
      throw Object.assign(new Error("مقاله مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    const { id } = request.params;
    
    const cover = request.file;
    const body = request.body;
    
    await validator.update.validate({ ...body, cover });

    const result = await model.findByIdAndUpdate(id, { ...body, cover: cover?.filename });

    if (result) {
      cover && unlink(`public/images/articles/${result.cover}`, (error) => error && console.error(error));

      response.json({ message: "مقاله مورد نظر با موفقیت ویرایش شد." });
    } else {
      throw Object.assign(new Error("مقاله مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    request.file && unlink(request.file.path, (error) => error && console.error(error));

    next(error);
  }
};

const publish = async (request, response, next) => {
  try {
    const { id } = request.params;

    const article = await model.findById(id);

    if (article) {
      if (article.isPublished) {
        throw Object.assign(new Error("مقاله مورد نظر از قبل منتشر شده است."), { status: 409 });
      } else {
        await model.findByIdAndUpdate(id, { isPublished: true });

        response.json({ message: "مقاله مورد نظر با موفقیت منتشر شد." });
      }
    } else {
      throw Object.assign(new Error("مقاله مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const draft = async (request, response, next) => {
  try {
    const { id } = request.params;

    const article = await model.findById(id);

    if (article) {
      if (article.isPublished) {
        await model.findByIdAndUpdate(id, { isPublished: false });

        response.json({ message: "مقاله مورد نظر با موفقیت پیش‌نویس شد." });
      } else {
        throw Object.assign(new Error("مقاله مورد نظر منتشر نشده است."), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("مقاله مورد نظر پیدا نشد."), { status: 404 });
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
      unlink(`public/images/articles/${result.cover}`, (error) => error && console.error(error));

      await commentModel.deleteMany({ article: id });

      response.json({ message: "مقاله مورد نظر با موفقیت حذف شد." });
    } else {
      throw Object.assign(new Error("مقاله مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, update, publish, draft, remove };