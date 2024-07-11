import model from "../models/ticket.js";
import validator from "../validators/ticket.js";

const create = async (request, response, next) => {
  try {
    const body = Object.fromEntries(Object.entries(request.body).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
    
    await validator.create.validate(body);

    await model.create({ ...body, isOpen: true, sender: request.user._id });

    response.status(201).json({ message: "تیکت شما با موفقیت ثبت شد." });
  } catch (error) {
    next(error);
  }
};

const reply = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request.user;

    const ticket = await model.findById(id);

    if (ticket) {
      if (role === "ADMIN" || _id.equals(ticket.sender)) {
        const body = Object.fromEntries(Object.entries(request.body).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
        
        await validator.reply.validate(body);

        await model.create({ ...body, sender: _id, ticket: id });

        response.status(201).json({ message: "پاسخ شما با موفقیت ثبت شد." });
      } else {
        throw Object.assign(new Error("شما دسترسی لازم برای پاسخ به تیکت مورد نظر را ندارید."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("تیکت مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { page = 1, length } = request.query;

    const tickets = await model.find({ ticket: { $exists: false } }, "-body -__v").populate({ path: "sender", select: "firstName lastName" }).sort({ createdAt: -1 }).lean();

    if (tickets.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length) || tickets.length;

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageTickets = tickets.slice(startIndex, endIndex);

      if (currentPageTickets.length) {
        return response.json({ tickets: currentPageTickets, total: tickets.length, nextPage: endIndex < tickets.length ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("تیکتی پیدا نشد."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request.user;

    const ticket = await model.findOne({ _id: id, ticket: { $exists: false } }, "-__v").populate([
      { path: "sender", select: "firstName lastName" },
      { path: "replies", select: "-__v", populate: { path: "sender", select: "firstName lastName" } },
    ]).lean();

    if (ticket) {
      if (role === "ADMIN" || _id.equals(ticket.sender._id)) {
        response.json(ticket);
      } else {
        throw Object.assign(new Error("شما دسترسی لازم به تیکت مورد نظر را ندارید."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("تیکت مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const open = async (request, response, next) => {
  try {
    const { id } = request.params;

    const ticket = await model.findOne({ _id: id, ticket: { $exists: false } });

    if (ticket) {
      if (ticket.isOpen) {
        throw Object.assign(new Error("تیکت مورد نظر از قبل باز شده است."), { status: 409 });
      } else {
        await model.findByIdAndUpdate(id, { isOpen: true });

        response.json({ message: "تیکت مورد نظر با موفقیت باز شد." });
      }
    } else {
      throw Object.assign(new Error("تیکت مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const close = async (request, response, next) => {
  try {
    const { id } = request.params;

    const ticket = await model.findOne({ _id: id, ticket: { $exists: false } });

    if (ticket) {
      if (ticket.isOpen) {
        await model.findByIdAndUpdate(id, { isOpen: false });

        response.json({ message: "تیکت مورد نظر با موفقیت بسته شد." });
      } else {
        throw Object.assign(new Error("تیکت مورد نظر از قبل بسته شده است."), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("تیکت مورد نظر پیدا نشد."), { status: 404 });
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
      await model.deleteMany({ ticket: id });

      response.json({ message: "تیکت مورد نظر با موفقیت حذف شد." });
    } else {
      throw Object.assign(new Error("تیکت مورد نظر پیدا نشد."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, reply, getAll, get, open, close, remove };