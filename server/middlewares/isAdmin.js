const middleware = (request, response, next) => {
  try {
    const isAdmin = request.user.role === "ADMIN";

    if (isAdmin) {
      next();
    } else {
      throw Object.assign(new Error("فقط مدیر ها دسترسی لازم به مسیر مورد نظر را دارند."), { status: 403 });
    }
  } catch (error) {
    next(error);
  }
};

export default middleware;