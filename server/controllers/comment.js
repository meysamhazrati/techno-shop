import commentModel from "../models/comment.js";

const create = async (request, response, next) => {
  try {
    await commentModel.validation(request.body);

    const { body, score, product, article } = request.body;

    await commentModel.create({
      body,
      score,
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
    const comments = await commentModel.find({}, "-__v").lean();

    if (comments.length) {
      response.json(comments);
    } else {
      throw Object.assign(new Error("No comment found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const confirm = async (request, response, next) => {
  try {
    const { id } = request.params;

    const comment = await commentModel.findById(id);

    if (comment) {
      if (comment.isConfirmed) {
        throw Object.assign(new Error("This comment has already been confirmed."), { status: 409 });
      } else {
        await commentModel.findByIdAndUpdate(id, { isConfirmed: true });

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

    const comment = await commentModel.findById(id);

    if (comment) {
      if (comment.isConfirmed) {
        await commentModel.findByIdAndUpdate(id, { isConfirmed: false });

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

    const result = await commentModel.findByIdAndDelete(id);

    if (result) {
      response.json({ message: "The comment has been successfully removed." });
    } else {
      throw Object.assign(new Error("The comment was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, confirm, reject, remove };