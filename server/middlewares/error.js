const middleware = (error, request, response, next) => {
  const { status = 500, message = "Unexpected error." } = error;
  response.status(status).json({ message });
};

export default middleware;