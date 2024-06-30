import axios from "../config";

const create = async (body) => await axios.postForm("/categories", body);

const getAll = async (page, length) => await axios.get("/categories", { params: { page, length } });

const get = async (title, productsBrands, productsPrice, onlyAvailableProducts, onlyAmazingProducts, productsSort, productsPage, productsLength) => await axios.get(`/categories/${title}`, { params: { "products-brands": productsBrands, "products-price": productsPrice, "only-available-products": onlyAvailableProducts, "only-amazing-products": onlyAmazingProducts, "products-sort": productsSort, "products-page": productsPage, "products-length": productsLength } });

const update = async (id, body) => await axios.putForm(`/categories/${id}`, body);

const remove = async (id) => await axios.delete(`/categories/${id}`);

export { create, getAll, get, update, remove };