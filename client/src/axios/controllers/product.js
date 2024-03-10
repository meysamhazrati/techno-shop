import axios from "../config";

const create = async (type, body) => await axios.postForm("/products", body, { params: { type } });

const getAll = async (sort, page, length) => await axios.get("/products", { params: { sort, page, length } });

const getByCategory = async (title, sort, page, length) => await axios.get(`/products/categories/${title}`, { params: { sort, page, length } });

const getByOffer = async (id, sort, page, length) => await axios.get(`/products/offers/${id}`, { params: { sort, page, length } });

const getBySearch = async (title, sort, page, length) => await axios.get(`/products/search/${title}`, { params: { sort, page, length } });

const get = async (id) => await axios.get(`/products/${id}`);

const update = async (id, type, body) => await axios.putForm(`/products/${id}`, body, { params: { type } });

const remove = async (id) => await axios.delete(`/products/${id}`);

export { create, getAll, getByCategory, getByOffer, getBySearch, get, update, remove };