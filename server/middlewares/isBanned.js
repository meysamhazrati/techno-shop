const middleware = (request, response, next) => {
  try {
    const isBanned = request.user.isBanned;

    if (isBanned) {
      throw Object.assign(new Error("شما مسدود شده‌اید."), { status: 403 });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default middleware;