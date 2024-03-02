import model from "../models/comment.js";
import orderModel from "../models/order.js";

const create = async (request, response, next) => {
  try {
    await model.validation(request.body);

    const { _id } = request.user;

    const { body, score, product, article } = request.body;

    await model.create({
      body,
      score,
      isBuyer: product ? Boolean(await orderModel.findOne({ buyer: _id, "products.product._id": product })) : undefined,
      sender: request.user._id,
      product,
      article,
    });

    response.status(201).json({ message: "The comment has been successfully added." });
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { page = 1, length } = request.query;

    const comments = await model.find({}, "-__v").populate([
      { path: "sender", select: "firstName lastName" },
      { path: "product article", select: "title" },
    ]).sort({ createdAt: -1 }).lean();

    if (comments.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length) || comments.length;

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageComments = comments.slice(startIndex, endIndex);

      if (currentPageComments.length) {
        return response.json({ comments: currentPageComments, total: comments.length, nextPage: endIndex < comments.length ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("No comment found."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const confirm = async (request, response, next) => {
  try {
    const { id } = request.params;

    const comment = await model.findById(id);

    if (comment) {
      if (comment.isConfirmed) {
        throw Object.assign(new Error("This comment has already been confirmed."), { status: 409 });
      } else {
        await model.findByIdAndUpdate(id, { isConfirmed: true });

        response.json({ message: "The comment has been successfully confirmed." });
      }
    } else {
      throw Object.assign(new Error("The comment was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const reject = async (request, response, next) => {
  try {
    const { id } = request.params;

    const comment = await model.findById(id);

    if (comment) {
      if (comment.isConfirmed) {
        await model.findByIdAndUpdate(id, { isConfirmed: false });

        response.json({ message: "The comment has been successfully rejected." });
      } else {
        throw Object.assign(new Error("This comment has already been rejected."), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("The comment was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request.user;

    const comment = await model.findById(id);

    if (comment) {
      if (role === "ADMIN" || _id.equals(comment.sender)) {
        await model.findByIdAndDelete(id);
  
        response.json({ message: "The comment has been successfully removed." });
      } else {
        throw Object.assign(new Error("You don't have access to remove this comment."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("The comment was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, confirm, reject, remove };