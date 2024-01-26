const middleware = (request, response, next) => {
  try {
    const isAdmin = request.user.role === "ADMIN";

    if (isAdmin) {
      next();
    } else {
      throw Object.assign(new Error("This route is only accessible to admins."), { status: 403 });
    }
  } catch (error) {
    next(error);
  }
};

export default middleware;