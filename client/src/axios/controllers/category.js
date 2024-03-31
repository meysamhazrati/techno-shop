import axios from "../config";

const create = async ({ title, englishTitle, logo }) => await axios.postForm("/categories", { title, englishTitle, logo });

const getAll = async (page, length) => await axios.get("/categories", { params: { page, length } });

const get = async (title, productsBrands, onlyAvailableProducts, onlyAmazingProducts, productsRange, productsSort, productsPage, productsLength ) => await axios.get(`/categories/${title}`, { params: { "products-brands": productsBrands, "only-available-products": onlyAvailableProducts, "only-amazing-products": onlyAmazingProducts, "products-range": productsRange, "products-sort": productsSort, "products-page": productsPage, "products-length": productsLength } });

const update = async (id, { title, englishTitle, logo }) => await axios.putForm(`/categories/${id}`, { title, englishTitle, logo });

const remove = async (id) => await axios.delete(`/categories/${id}`);

export { create, getAll, get, update, remove };