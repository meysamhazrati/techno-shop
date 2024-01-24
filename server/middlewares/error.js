const middleware = (error, request, response, next) => {
  const { status = error.code === "LIMIT_FILE_SIZE" ? 413 : error.name === "ValidationError" ? 400 : 500, message = "Unexpected error." } = error;
  
  response.status(status).json({ message });
};

export default middleware;