import axios from "../config";

const create = async ({ title, englishTitle, description, percent, expiresAt, categories }) => await axios.post("/offers", { title, englishTitle, description, percent, expiresAt, categories });

const getAll = async (page, length) => await axios.get("/offers", { params: { page, length } });

const get = async (title, productsBrands, productsCategories, productsPrice, onlyAvailableProducts, productsSort, productsPage, productsLength ) => await axios.get(`/offers/${title}`, { params: { "products-brands": productsBrands, "products-categories": productsCategories, "products-price": productsPrice, "only-available-products": onlyAvailableProducts, "products-sort": productsSort, "products-page": productsPage, "products-length": productsLength } });

const update = async (id, { title, englishTitle, description, percent, expiresAt }) => await axios.put(`/offers/${id}`, { title, englishTitle, description, percent, expiresAt });

const remove = async (id) => await axios.delete(`/offers/${id}`);

export { create, getAll, get, update, remove };