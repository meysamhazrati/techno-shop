import axios from "../config";

const create = async (type, body) => await axios.postForm("/products", body, { params: { type } });

const getAll = async (search, brands, categories, price, onlyAvailable, onlyAmazing, sort, page, length) => await axios.get("/products", { params: { search, brands, categories, price, "only-available": onlyAvailable, "only-amazing": onlyAmazing, sort, page, length } });

const get = async (id, onlyConfirmedComments, commentsPage, commentsLength) => await axios.get(`/products/${id}`, { params: { "only-confirmed-comments": onlyConfirmedComments, "comments-page": commentsPage, "comments-length": commentsLength } });

const update = async (id, type, body) => await axios.put(`/products/${id}`, body, { params: { type } });

const remove = async (id) => await axios.delete(`/products/${id}`);

export { create, getAll, get, update, remove };