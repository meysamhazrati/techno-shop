import express, { json, urlencoded, static as static_ } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import cors from "./middlewares/cors.js";
import notFoundHandler from "./middlewares/notFound.js";
import errorHandler from "./middlewares/error.js";

const app = express();

app.use(cors);
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(static_(join(dirname(fileURLToPath(import.meta.url)), "public")));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;