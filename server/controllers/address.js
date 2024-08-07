import model from "../models/address.js";
import validator from "../validators/address.js";

const create = async (request, response, next) => {
  try {
    const body = Object.fromEntries(Object.entries(request.body).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));

    await validator.validate(body);

    await model.create({ ...body, recipient: request.user._id });

    response.status(201).json({ message: "آدرس شما با موفقیت ثبت شد." });
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { page = 1, length } = request.query;

    const addresses = await model.find({}, "-__v").populate({ path: "recipient", select: "firstName lastName" }).sort({ createdAt: -1 }).lean();

    if (addresses.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length) || addresses.length;

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageAddresses = addresses.slice(startIndex, endIndex);

      if (currentPageAddresses.length) {
        return response.json({ addresses: currentPageAddresses, total: addresses.length, nextPage: endIndex < addresses.length ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("آدرسی پیدا نشد."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request.user;

    const address = await model.findById(id);

    if (address) {
      if (role === "ADMIN" || _id.equals(address.recipient)) {
        const body = Object.fromEntries(Object.entries(request.body).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
        
        await validator.validate(body);

        await model.findByIdAndUpdate(id, body);

        response.json({ message: "آدرس مورد نظر با موفقیت ویرایش شد." });
      } else {
        throw Object.assign(new Error("شما دسترسی لازم برای ویرایش آدرس مورد نظر را ندارید."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("آدرس مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request.user;

    const address = await model.findById(id);

    if (address) {
      if (role === "ADMIN" || _id.equals(address.recipient)) {
        await model.findByIdAndDelete(id);

        response.json({ message: "آدرس مورد نظر با موفقیت حذف شد." });
      } else {
        throw Object.assign(new Error("شما دسترسی لازم برای حذف آدرس مورد نظر را ندارید."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("آدرس مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, getAll, update, remove };