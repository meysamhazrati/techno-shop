import model from "../models/ticket.js";

const create = async (request, response, next) => {
  try {
    await model.createValidation(request.body);

    const { department, title, body } = request.body;

    await model.create({
      department,
      title,
      body,
      isOpen: true,
      sender: request.user._id,
    });

    response.status(201).json({ message: "The ticket has been successfully added." });
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
        await model.replyValidation(request.body);

        const { body } = request.body;

        await model.create({ body, sender: _id, ticket: id });

        response.status(201).json({ message: "Your reply has been successfully sent." });
      } else {
        throw Object.assign(new Error("You don't have access to reply to this ticket."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("The ticket was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const getAll = async (request, response, next) => {
  try {
    const { page = 1, length = 6 } = request.query;

    const tickets = await model.find({ ticket: { $exists: false } }, "-body -__v").populate({ path: "sender", select: "firstName lastName" }).sort({ createdAt: -1 }).lean();

    if (tickets.length) {
      const currentPage = parseInt(page);
      const lengthPerPage = parseInt(length);

      const startIndex = (currentPage - 1) * lengthPerPage;
      const endIndex = startIndex + lengthPerPage;

      const currentPageTickets = tickets.slice(startIndex, endIndex);
      const hasNextPage = endIndex < tickets.length;

      if (currentPageTickets.length) {
        return response.json({ tickets: currentPageTickets, hasNextPage, nextPage: hasNextPage ? currentPage + 1 : null });
      }
    }

    throw Object.assign(new Error("No ticket found."), { status: 404 });
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { _id, role } = request.user;

    const ticket = await model.findById(id, "-__v").populate([
      { path: "sender", select: "firstName lastName" },
      { path: "replies", select: "-__v", populate: { path: "sender", select: "firstName lastName" } },
    ]).lean();

    if (ticket) {
      if (role === "ADMIN" || _id.equals(ticket.sender)) {
        response.json(ticket);
      } else {
        throw Object.assign(new Error("You don't have access to this ticket."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("The ticket was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const open = async (request, response, next) => {
  try {
    const { id } = request.params;

    const ticket = await model.findById(id);

    if (ticket) {
      if (ticket.isOpen) {
        throw Object.assign(new Error("This ticket is already open."), { status: 409 });
      } else {
        await model.findByIdAndUpdate(id, { isOpen: true });

        response.json({ message: "The ticket has been successfully opened." });
      }
    } else {
      throw Object.assign(new Error("The ticket was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const close = async (request, response, next) => {
  try {
    const { id } = request.params;

    const ticket = await model.findById(id);

    if (ticket) {
      if (ticket.isOpen) {
        await model.findByIdAndUpdate(id, { isOpen: false });

        response.json({ message: "The ticket has been successfully closed." });
      } else {
        throw Object.assign(new Error("This ticket has already been closed."), { status: 409 });
      }
    } else {
      throw Object.assign(new Error("The ticket was not found."), { status: 404 });
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

      response.json({ message: "The ticket has been successfully removed." });
    } else {
      throw Object.assign(new Error("The ticket was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, reply, getAll, get, open, close, remove };