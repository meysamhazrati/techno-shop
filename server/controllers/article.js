import { unlink } from "fs";

import model from "../models/article.js";
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
    const { page = 1, length = 6 } = request.query;

    const articles = await model.find({}, "-__v").populate([
      { path: "author", select: "firstName lastName avatar" },
      { path: "category", select: "-offer -__v" },
      { path: "comments", select: "score" },
    ]).sort({ createdAt: -1 }).lean();

    if (articles.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length);

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageArticles = articles.slice(startIndex, endIndex).map(({ comments, ...article }) => ({ ...article, score: parseFloat((comments.reduce((previous, { score }) => previous + score, 5) / (comments.length + 1) || 5).toFixed(1)) }));
      const hasNextPage = endIndex < articles.length;

      if (currentPageArticles.length) {
        return response.json({ articles: currentPageArticles, hasNextPage, nextPage: hasNextPage ? currentPage + 1 : null });
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

    const article = await model.findById(id, "-__v").populate([
      { path: "author", select: "firstName lastName avatar" },
      { path: "category", select: "-offer -__v" },
      { path: "comments", select: "-__v", populate: { path: "sender", select: "firstName lastName avatar" } },
    ]).lean();

    if (article) {
      response.json({ ...article, score: parseFloat((article.comments.reduce((previous, { score }) => previous + score, 5) / (article.comments.length + 1) || 5).toFixed(1)) });
    } else {
      throw Object.assign(new Error("The article was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const getByCategory = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { page = 1, length = 6 } = request.query;

    const articles = await model.find({ category: id }, "-category -__v").populate([
      { path: "author", select: "firstName lastName avatar" },
      { path: "category", select: "-offer -__v" },
      { path: "comments", select: "score" },
    ]).sort({ createdAt: -1 }).lean();

    if (articles.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length);

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageArticles = articles.slice(startIndex, endIndex).map(({ comments, ...article }) => ({ ...article, score: parseFloat((comments.reduce((previous, { score }) => previous + score, 5) / (comments.length + 1) || 5).toFixed(1)) }));
      const hasNextPage = endIndex < articles.length;

      if (currentPageArticles.length) {
        return response.json({ articles: currentPageArticles, hasNextPage, nextPage: hasNextPage ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("No article found."), { status: 404 });
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

export { create, getAll, get, getByCategory, update, publish, draft, confirm, reject, remove };