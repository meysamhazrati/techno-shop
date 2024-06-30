import axios from "../config";

const create = async (body) => await axios.post("/addresses", body);

const getAll = async (page, length) => await axios.get("/addresses", { params: { page, length } });

const update = async (id, body) => await axios.put(`/addresses/${id}`, body);

const remove = async (id) => await axios.delete(`/addresses/${id}`);

export { create, getAll, update, remove };