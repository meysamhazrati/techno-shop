import { unlink } from "fs";

import model from "../models/article.js";
import categoryModel from "../models/category.js";
import commentModel from "../models/comment.js";

const create = async (request, response, next) => {
  try {
    const cover = request.file;
    await model.createValidation({ ...request.body, cover });

    const { title, body, isPublished, category } = request.body;

    await model.create({
      title,
      cover: cover.filename,
      body,
      isPublished,
      author: request.user._id,
      category,
    });

    response.status(201).json({ message: `The article has been successfully added and ${JSON.parse(isPublished) ? "published" : "drafted"}.` });
  } catch (error) {
    request.file && unlink(request.file.path, (error) => console.error(error));

    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { categories, "only-published": onlyPublished = false, "only-confirmed": onlyConfirmed = false, sort, page = 1, length } = request.query;

    const filteredCategories = categories?.trim() ? await Promise.all(categories.trim().split(",").map(async (title) => (await categoryModel.findOne({ englishTitle: { $regex: new RegExp(`^${title.split("-").join(" ")}$`, "i") } }))?._id)) : undefined;

    const articles = await model.find({ category: filteredCategories }, "-body -__v").populate([
      { path: "author", select: "firstName lastName avatar" },
      { path: "category", select: "-__v" },
      { path: "comments", select: "score" },
    ]).lean();

    const filteredArticles = articles.filter(({ isPublished, isConfirmed }) => (JSON.parse(onlyPublished) ? isPublished : true) && (JSON.parse(onlyConfirmed) ? isConfirmed : true));

    if (filteredArticles.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length) || filteredArticles.length;

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      let sortedArticles = [];

      switch (sort) {
        case "oldest": {
          sortedArticles = filteredArticles.toSorted((firstArticle, secondArticle) => firstArticle.createdAt - secondArticle.createdAt);
          break;
        }
        case "popular": {
          sortedArticles = filteredArticles.toSorted((firstArticle, secondArticle) => parseFloat((secondArticle.comments.reduce((previous, { score }) => previous + score, 5) / (secondArticle.comments.length + 1) || 5).toFixed(1)) - parseFloat((firstArticle.comments.reduce((previous, { score }) => previous + score, 5) / (firstArticle.comments.length + 1) || 5).toFixed(1)));
          break;
        }
        default: {
          sortedArticles = filteredArticles.toSorted((firstArticle, secondArticle) => secondArticle.createdAt - firstArticle.createdAt);
          break;
        }
      }

      const currentPageArticles = sortedArticles.slice(startIndex, endIndex).map(({ comments, ...article }) => ({ ...article, score: parseFloat((comments.reduce((previous, { score }) => previous + score, 5) / (comments.length + 1) || 5).toFixed(1)) }));

      if (currentPageArticles.length) {
        return response.json({ articles: currentPageArticles, total: sortedArticles.length, nextPage: endIndex < sortedArticles.length ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("No article found."), { status: 404 });
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
      throw Object.assign(new Error("The article was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request.user;

    const article = await model.findById(id);

    if (article) {
      if (role === "ADMIN" || _id.equals(article.author)) {
        await model.updateValidation(request.body);

        const cover = request.file;
        const { title, body, isPublished } = request.body;

        await model.findByIdAndUpdate(id, {
          title,
          cover: cover?.filename,
          body,
          isPublished: article.isPublished || isPublished,
        });

        cover && unlink(`public/articles/${article.cover}`, (error) => console.error(error));

        response.json({ message: `The article has been successfully edited and ${article.isPublished || JSON.parse(isPublished) ? "published" : "drafted"}.` });
      } else {
        throw Object.assign(new Error("You don't have access to edit this article."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("The article was not found."), { status: 404 });
    }
  } catch (error) {
    request.file && unlink(request.file.path, (error) => console.error(error));

    next(error);
  }
};

const publish = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request.user;

    const article = await model.findById(id);

    if (article) {
      if (role === "ADMIN" || _id.equals(article.author)) {
        if (article.isPublished) {
          throw Object.assign(new Error("This article is currently published."), { status: 409 });
        } else {
          await model.findByIdAndUpdate(id, { isPublished: true });

          response.json({ message: "The article has been successfully published." });
        }
      } else {
        throw Object.assign(new Error("You don't have access to publish this article."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("The article was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const draft = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request.user;

    const article = await model.findById(id);

    if (article) {
      if (role === "ADMIN" || _id.equals(article.author)) {
        if (article.isPublished) {
          await model.findByIdAndUpdate(id, { isPublished: false });

          response.json({ message: "The article has been successfully drafted." });
        } else {
          throw Object.assign(new Error("This article has not been published."), { status: 409 });
        }
      } else {
        throw Object.assign(new Error("You don't have access to draft this article."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("The article was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const confirm = async (request, response, next) => {
  try {
    const { id } = request.params;

    const article = await model.findById(id);

    if (article) {
      if(article.isPublished) {
        if (article.isConfirmed) {
          throw Object.assign(new Error("This article has already been confirmed."), { status: 409 });
        } else {
          await model.findByIdAndUpdate(id, { isConfirmed: true });
  
          response.json({ message: "The article has been successfully confirmed." });
        }
      } else {
        throw Object.assign(new Error("This article has not been published."), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("The article was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const reject = async (request, response, next) => {
  try {
    const { id } = request.params;

    const article = await model.findById(id);

    if (article) {
      if(article.isPublished) {
        if (article.isConfirmed) {
          await model.findByIdAndUpdate(id, { isConfirmed: false });
  
          response.json({ message: "The article has been successfully rejected." });
        } else {
          throw Object.assign(new Error("This article has already been rejected."), { status: 409 });
        }
      } else {
        throw Object.assign(new Error("This article has not been published."), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("The article was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request.user;

    const article = await model.findById(id);

    if (article) {
      if (role === "ADMIN" || _id.equals(article.author)) {
        await model.findByIdAndDelete(id);

        unlink(`public/articles/${article.cover}`, (error) => console.error(error));

        await commentModel.deleteMany({ article: id });

        response.json({ message: "The article has been successfully removed." });
      } else {
        throw Object.assign(new Error("You don't have access to remove this article."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("The article was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, get, update, publish, draft, confirm, reject, remove };