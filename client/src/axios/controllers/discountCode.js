import axios from "../config";

const create = async ({ code, percent, minimumPrice, maximumUsage, expiresAt, categories }) => await axios.post("/discount-codes", { code, percent, minimumPrice, maximumUsage, expiresAt, categories });

const getAll = async (page, length) => await axios.get("/discount-codes", { params: { page, length } });

const use = async (code, { price, categories }) => await axios.put(`/discount-codes/use/${code}`, { price, categories });

const remove = async (id) => await axios.delete(`/discount-codes/${id}`);

export { create, getAll, use, remove };