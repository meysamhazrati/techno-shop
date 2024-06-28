const middleware = (request, response, next) => response.status(404).json({ message: "مسیر مورد نظر پیدا نشد." });

export default middleware;