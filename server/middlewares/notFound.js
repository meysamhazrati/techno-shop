const middleware = (request, response, next) => response.status(404).json({ message: "Route not found." });

export default middleware;