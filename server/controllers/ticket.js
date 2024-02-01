import ticketModel from "../models/ticket.js";

const create = async (request, response, next) => {
  try {
    await ticketModel.validation(request.body);

    const { department, title, body } = request.body;

    await ticketModel.create({
      department,
      title,
      body,
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

    const { user } = request;

    const ticket = await ticketModel.findById(id);

    if (ticket) {
      if (user.role === "ADMIN" || user._id.equals(ticket.sender)) {
        await ticketModel.validation(request.body);

        const { department, title, body } = request.body;

        await ticketModel.create({
          department,
          title,
          body,
          sender: request.user._id,
          ticket: id,
        });

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
    const tickets = await ticketModel.find({}, "-__v").lean();

    if (tickets.length) {
      response.json(tickets);
    } else {
      throw Object.assign(new Error("No ticket found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const get = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { user } = request;

    const ticket = await ticketModel.findById(id, "-__v").lean();

    if (ticket) {
      if (user.role === "ADMIN" || user._id.equals(ticket.sender)) {
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

    const ticket = await ticketModel.findById(id);

    if (ticket) {
      if (ticket.isOpen) {
        throw Object.assign(new Error("This ticket is already open."), { status: 409 });
      } else {
        await ticketModel.findByIdAndUpdate(id, { isOpen: true });

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

    const ticket = await ticketModel.findById(id);

    if (ticket) {
      if (ticket.isOpen) {
        await ticketModel.findByIdAndUpdate(id, { isOpen: false });

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

export { create, reply, getAll, get, open, close };