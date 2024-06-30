import axios from "../config";

const create = async (body) => await axios.post("/offers", body);

const getAll = async (page, length) => await axios.get("/offers", { params: { page, length } });

const get = async (title, productsBrands, productsCategories, productsPrice, onlyAvailableProducts, productsSort, productsPage, productsLength) => await axios.get(`/offers/${title}`, { params: { "products-brands": productsBrands, "products-categories": productsCategories, "products-price": productsPrice, "only-available-products": onlyAvailableProducts, "products-sort": productsSort, "products-page": productsPage, "products-length": productsLength } });

const update = async (id, body) => await axios.put(`/offers/${id}`, body);

const remove = async (id) => await axios.delete(`/offers/${id}`);

export { create, getAll, get, update, remove };