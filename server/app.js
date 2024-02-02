import express, { json, urlencoded, static as static_ } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import cors from "./middlewares/cors.js";
import notFoundHandler from "./middlewares/notFound.js";
import errorHandler from "./middlewares/error.js";
import authenticationRouter from "./routes/authentication.js";
import userRouter from "./routes/user.js";
import addressRouter from "./routes/address.js";
import brandRouter from "./routes/brand.js";
import categoryRouter from "./routes/category.js";
import productRouter from "./routes/product.js";
import orderRouter from "./routes/order.js";
import articleRouter from "./routes/article.js";
import commentRouter from "./routes/comment.js";
import ticketRouter from "./routes/ticket.js";
import discountCodeRouter from "./routes/discountCode.js";

const app = express();

app.use(cors);
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(static_(join(dirname(fileURLToPath(import.meta.url)), "public")));

app.use("/authentication", authenticationRouter);
app.use("/users", userRouter);
app.use("/addresses", addressRouter);
app.use("/brands", brandRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/articles", articleRouter);
app.use("/comments", commentRouter);
app.use("/tickets", ticketRouter);
app.use("/discountCodes", discountCodeRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;