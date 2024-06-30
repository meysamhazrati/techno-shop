import axios from "../config";

const create = async (body) => await axios.postForm("/brands", body);

const getAll = async (page, length) => await axios.get("/brands", { params: { page, length } });

const get = async (name, productsCategories, productsPrice, onlyAvailableProducts, onlyAmazingProducts, productsSort, productsPage, productsLength) => await axios.get(`/brands/${name}`, { params: { "products-categories": productsCategories, "products-price": productsPrice, "only-available-products": onlyAvailableProducts, "only-amazing-products": onlyAmazingProducts, "products-sort": productsSort, "products-page": productsPage, "products-length": productsLength } });

const update = async (id, body) => await axios.putForm(`/brands/${id}`, body);

const remove = async (id) => await axios.delete(`/brands/${id}`);

export { create, getAll, get, update, remove };