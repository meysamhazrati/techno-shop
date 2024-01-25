import { unlink } from "fs";

import articleModel from "../models/article.js";

const create = async (request, response, next) => {
  try {
    const cover = request.file;
    await articleModel.createValidation({ ...request.body, cover });

    const { title, body, isPublished, category } = request.body;

    await articleModel.create({
      title,
      cover: cover.filename,
      body,
      isPublished,
      author: request.user._id,
      category,
    });

    response.status(201).json({ message: `The article has been successfully added and ${JSON.parse(isPublished) ? "published" : "drafted"}.` });
  } catch (error) {
    request.file && unlink(request.file.path, (error) => error && console.error(error));

    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const articles = await articleModel.find({}, "-__v").lean();

    if (articles.length) {
      response.json(articles);
    } else {
      throw Object.assign(new Error("No article found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;

    const article = await articleModel.findById(id, "-__v").lean();

    if (article) {
      response.json(article);
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

    const articles = await articleModel.find({ category: id }, "-category -__v").lean();

    if (articles.length) {
      response.json(articles);
    } else {
      throw Object.assign(new Error("No article found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { user } = request;

    const article = await articleModel.findById(id);

    if (article) {
      if (user.role === "ADMIN" || user._id.equals(article.author)) {
        await articleModel.updateValidation(request.body);
        
        const cover = request.file;
        const { title, body, isPublished } = request.body;

        await articleModel.findByIdAndUpdate(id, {
          title,
          cover: cover?.filename,
          body,
          isPublished: article.isPublished || isPublished,
        });

        cover && unlink(`public/articles/${article.cover}`, (error) => error && console.error(error));

        response.json({ message: `The article has been successfully edited and ${article.isPublished ? "published" : JSON.parse(isPublished) ? "published" : "drafted"}.` });
      } else {
        throw Object.assign(new Error("You don't have access to edit this article."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("The article was not found."), { status: 404 });
    }
  } catch (error) {
    request.file && unlink(request.file.path, (error) => error && console.error(error));

    next(error);
  }
};

const publish = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { user } = request;

    const article = await articleModel.findById(id);

    if (article) {
      if (user.role === "ADMIN" || user._id.equals(article.author)) {
        if (article.isPublished) {
          throw Object.assign(new Error("This article is currently published."), { status: 409 });
        } else {
          await articleModel.findByIdAndUpdate(id, { isPublished: true });

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

    const { user } = request;

    const article = await articleModel.findById(id);

    if (article) {
      if (user.role === "ADMIN" || user._id.equals(article.author)) {
        if (article.isPublished) {
          await articleModel.findByIdAndUpdate(id, { isPublished: false });

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

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { user } = request;

    const article = await articleModel.findById(id);

    if (article) {
      if (user.role === "ADMIN" || user._id.equals(article.author)) {
        await articleModel.findByIdAndDelete(id);

        unlink(`public/articles/${article.cover}`, (error) => error && console.error(error));

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

export { create, getAll, get, getByCategory, update, publish, draft, remove };