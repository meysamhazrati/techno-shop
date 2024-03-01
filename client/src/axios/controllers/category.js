import axios from "../config";

const create = async ({ title, englishTitle }) => await axios.post("/categories", { title, englishTitle });

const getAll = async (page, length) => await axios.get("/categories", { params: { page, length } });

const get = async (title) => await axios.get(`/categories/${title}`);

const update = async (id, { title, englishTitle }) => await axios.put(`/categories/${id}`, { title, englishTitle });

const remove = async (id) => await axios.delete(`/categories/${id}`);

export { create, getAll, get, update, remove };