import axios from "../config";

const create = async ({ title, englishTitle, logo }) => await axios.postForm("/categories", { title, englishTitle, logo });

const getAll = async (page, length) => await axios.get("/categories", { params: { page, length } });

const get = async (title) => await axios.get(`/categories/${title}`);

const update = async (id, { title, englishTitle, logo }) => await axios.putForm(`/categories/${id}`, { title, englishTitle, logo });

const remove = async (id) => await axios.delete(`/categories/${id}`);

export { create, getAll, get, update, remove };