const middleware = (request, response, next) => {
  const isAdmin = request.user.role === "ADMIN";

  if (isAdmin) {
    next();
  } else {
    response.status(403).json({ message: "This route is protected and you can't access it." });
  }
};

export default middleware;