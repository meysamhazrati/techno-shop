const middleware = (request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URI);
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

export default middleware;