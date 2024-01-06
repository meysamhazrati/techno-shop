import express, { json, urlencoded } from "express";

import cors from "./middlewares/cors.js";
import notFoundHandler from "./middlewares/notFound.js";
import errorHandler from "./middlewares/error.js";

const app = express();

app.use(cors);
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;