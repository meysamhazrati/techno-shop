import express, { json, urlencoded } from "express";

import cors from "./middlewares/cors.js";

const app = express();

app.use(cors);
app.use(json());
app.use(urlencoded({ extended: true }));

export default app;