import model from "../models/address.js";

const create = async (request, response, next) => {
  try {
    await model.validation(request.body);

    const { province, city, postalCode, body } = request.body;

    await model.create({
      province,
      city,
      postalCode,
      body,
      recipient: request.user._id,
    });

    response.status(201).json({ message: "The address has been successfully added." });
  } catch (error) {
    next(error);
  }
};

const update = async (request, response, next) => {
  try {
    const { id } = request.params;

    const address = await model.findById(id);

    if (address) {
      if (request.user._id.equals(address.recipient)) {
        await model.validation(request.body);

        const { province, city, postalCode, body } = request.body;

        await model.findByIdAndUpdate(id, {
          province,
          city,
          postalCode,
          body,
        });

        response.json({ message: "The address has been successfully edited." });
      } else {
        throw Object.assign(new Error("You don't have access to edit this address."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("The address was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (request, response, next) => {
  try {
    const { id } = request.params;

    const address = await model.findById(id);

    if (address) {
      if (request.user._id.equals(address.recipient)) {
        await model.findByIdAndDelete(id);

        response.json({ message: "The address has been successfully removed." });
      } else {
        throw Object.assign(new Error("You don't have access to remove this address."), { status: 403 });
      }
    } else {
      throw Object.assign(new Error("The address was not found."), { status: 404 });
    }
  } catch (error) {
    next(error);
  }
};

export { create, update, remove };