import express, { json, urlencoded } from "express";

import cors from "./middlewares/cors.js";
import notFoundHandler from "./middlewares/notFound.js";

const app = express();

app.use(cors);
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(notFoundHandler);

export default app;