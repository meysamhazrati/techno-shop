import axios from "../config";

const create = async ({ province, city, postalCode, body }) => await axios.post("/addresses", { province, city, postalCode, body });

const getAll = async (page, length) => await axios.get("/addresses", { params: { page, length } });

const update = async (id, { province, city, postalCode, body }) => await axios.put(`/addresses/${id}`, { province, city, postalCode, body });

const remove = async (id) => await axios.delete(`/addresses/${id}`);

export { create, getAll, update, remove };