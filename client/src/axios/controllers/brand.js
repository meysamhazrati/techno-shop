import axios from "../config";

const create = async ({ name, englishName, logo }) => await axios.postForm("/brands", { name, englishName, logo });

const getAll = async (page, length) => await axios.get("/brands", { params: { page, length } });

const update = async (id, { name, englishName, logo }) => await axios.putForm(`/brands/${id}`, { name, englishName, logo });

const remove = async (id) => await axios.delete(`/brands/${id}`);

export { create, getAll, update, remove };