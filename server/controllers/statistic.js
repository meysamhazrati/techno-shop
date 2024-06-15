import userModel from "../models/user.js";
import brandModel from "../models/brand.js";
import categoryModel from "../models/category.js";
import productModel from "../models/product.js";
import orderModel from "../models/order.js";
import articleModel from "../models/article.js";
import commentModel from "../models/comment.js";
import ticketModel from "../models/ticket.js";
import offerModel from "../models/offer.js";
import discountCodeModel from "../models/discountCode.js";

const getAll = async (request, response, next) => {
  try {
    const orders = await orderModel.find({ status: ["In progress", "Delivered"] });

    const totalUsers = await userModel.countDocuments();
    const totalBrands = await brandModel.countDocuments();
    const totalCategories = await categoryModel.countDocuments();
    const totalProducts = await productModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const totalArticles = await articleModel.countDocuments();
    const totalComments = await commentModel.countDocuments();
    const totalTickets = await ticketModel.countDocuments({ ticket: { $exists: false } });
    const totalOffers = await offerModel.countDocuments();
    const totalDiscountCodes = await discountCodeModel.countDocuments();
    const totalSales = orders.flatMap(({ products }) => products).reduce((previous, { quantity }) => previous + quantity, 0);
    const totalRevenue = orders.reduce((previous, { totalPrice }) => previous + totalPrice, 0);
    const yearly = {};

    orders.map(({ totalPrice, products, createdAt }) => {
      const year = new Intl.DateTimeFormat("fa", { year: "numeric" }).format(createdAt).replaceAll(/./g, (number) => number.charCodeAt(0) - 1776);
      const month = new Intl.DateTimeFormat("fa", { month: "numeric" }).format(createdAt).replaceAll(/./g, (number) => number.charCodeAt(0) - 1776);

      if (!(year in yearly)) {
        const currentYear = new Intl.DateTimeFormat("fa", { year: "numeric" }).format().replaceAll(/./g, (number) => number.charCodeAt(0) - 1776);
        const currentMonth = new Intl.DateTimeFormat("fa", { month: "numeric" }).format().replaceAll(/./g, (number) => number.charCodeAt(0) - 1776);

        yearly[year] = [
          { month: "فروردین", totalSales: 0, totalRevenue: 0 },
          { month: "اردیبهشت", totalSales: 0, totalRevenue: 0 },
          { month: "خرداد", totalSales: 0, totalRevenue: 0 },
          { month: "تیر", totalSales: 0, totalRevenue: 0 },
          { month: "مرداد", totalSales: 0, totalRevenue: 0 },
          { month: "شهریور", totalSales: 0, totalRevenue: 0 },
          { month: "مهر", totalSales: 0, totalRevenue: 0 },
          { month: "آبان", totalSales: 0, totalRevenue: 0 },
          { month: "آذر", totalSales: 0, totalRevenue: 0 },
          { month: "دی", totalSales: 0, totalRevenue: 0 },
          { month: "بهمن", totalSales: 0, totalRevenue: 0 },
          { month: "اسفند", totalSales: 0, totalRevenue: 0 },
        ].slice(0, year < currentYear ? 12 : currentMonth);
      }

      yearly[year][month - 1].totalSales += products.reduce((previous, { quantity }) => previous + quantity, 0);
      yearly[year][month - 1].totalRevenue += totalPrice;
    });

    response.json({
      totalUsers,
      totalBrands,
      totalCategories,
      totalProducts,
      totalOrders,
      totalArticles,
      totalComments,
      totalTickets,
      totalOffers,
      totalDiscountCodes,
      totalSales,
      totalRevenue,
      yearly,
    });
  } catch (error) {
    next(error);
  }
};

export { getAll };