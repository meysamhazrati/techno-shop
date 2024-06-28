import express, { json, urlencoded, static as static_ } from "express";

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
import favoriteRouter from "./routes/favorite.js";
import articleRouter from "./routes/article.js";
import commentRouter from "./routes/comment.js";
import ticketRouter from "./routes/ticket.js";
import offerRouter from "./routes/offer.js";
import discountCodeRouter from "./routes/discountCode.js";
import statisticRouter from "./routes/statistic.js";
import otpRouter from "./routes/otp.js";

const app = express();

app.use(cors);
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(static_("public"));

app.use("/api/authentication", authenticationRouter);
app.use("/api/users", userRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/brands", brandRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/favorites", favoriteRouter);
app.use("/api/articles", articleRouter);
app.use("/api/comments", commentRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/offers", offerRouter);
app.use("/api/discount-codes", discountCodeRouter);
app.use("/api/statistics", statisticRouter);
app.use("/api/otps", otpRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;