import axios from "../config";

const create = async (type, body) => await axios.postForm("/products", body, { params: { type } });

const getAll = async (search, brands, categories, onlyAvailable, onlyAmazing, range, sort, page, length) => await axios.get("/products", { params: { search, brands, categories, "only-available": onlyAvailable, "only-amazing": onlyAmazing, range, sort, page, length } });

const get = async (id, commentsPage, commentsLength) => await axios.get(`/products/${id}`, { params: { "comments-page": commentsPage, "comments-length": commentsLength } });

const update = async (id, type, body) => await axios.putForm(`/products/${id}`, body, { params: { type } });

const remove = async (id) => await axios.delete(`/products/${id}`);

export { create, getAll, get, update, remove };