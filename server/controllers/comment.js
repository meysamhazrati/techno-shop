import model from "../models/comment.js";
import orderModel from "../models/order.js";
import validator from "../validators/comment.js";

const create = async (request, response, next) => {
  try {
    const { _id } = request.user;
    
    const body = request.body;
    
    await validator.create.validate(body);

    await model.create({ ...body, isBuyer: body.product ? Boolean(await orderModel.findOne({ buyer: _id, "products.product._id": body.product })) : undefined, sender: request.user._id });

    response.status(201).json({ message: "دیدگاه شما با موفقیت ثبت شد." });
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

    throw Object.assign(new Error("دیدگاهی پیدا نشد."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    const { id } = request.params;
    
    const { _id, role } = request.user;

    const comment = await model.findById(id);

    if (comment) {
      if (role === "ADMIN" || _id.equals(comment.sender)) {
        const body = request.body;

        await validator.update.validate(body);

        await model.findByIdAndUpdate(id, body);

        response.json({ message: "دیدگاه مورد نظر با موفقیت ویرایش شد." });
      } else {
        throw Object.assign(new Error("شما دسترسی لازم برای ویرایش دیدگاه مورد نظر را ندارید."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("دیدگاه مورد نظر پیدا نشد."), { status: 404 });
    }
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
        throw Object.assign(new Error("دیدگاه مورد نظر از قبل تایید شده است."), { status: 409 });
      } else {
        await model.findByIdAndUpdate(id, { isConfirmed: true });

        response.json({ message: "دیدگاه مورد نظر با موفقیت تایید شد." });
      }
    } else {
      throw Object.assign(new Error("دیدگاه مورد نظر پیدا نشد."), { status: 404 });
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

        response.json({ message: "دیدگاه مورد نظر با موفقیت رد شد." });
      } else {
        throw Object.assign(new Error("دیدگاه مورد نظر از قبل رد شده است."), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("دیدگاه مورد نظر پیدا نشد."), { status: 404 });
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
  
        response.json({ message: "دیدگاه مورد نظر با موفقیت حذف شد." });
      } else {
        throw Object.assign(new Error("شما دسترسی لازم برای حذف دیدگاه مورد نظر را ندارید."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("دیدگاه مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, update, confirm, reject, remove };