import axios from "../config";

const create = async (body) => await axios.post("/discount-codes", body);

const getAll = async (page, length) => await axios.get("/discount-codes", { params: { page, length } });

const use = async (code, body) => await axios.put(`/discount-codes/use/${code}`, body);

const remove = async (id) => await axios.delete(`/discount-codes/${id}`);

export { create, getAll, use, remove };