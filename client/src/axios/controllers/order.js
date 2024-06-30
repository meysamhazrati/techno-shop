import axios from "../config";

const create = async (body) => await axios.post("/orders", body);

const getAll = async (page, length) => await axios.get("/orders", { params: { page, length } });

const get = async (id) => await axios.get(`/orders/${id}`);

const deliver = async (id) => await axios.put(`/orders/deliver/${id}`);

const cancel = async (id) => await axios.put(`/orders/cancel/${id}`);

const return_ = async (id) => await axios.put(`/orders/return/${id}`);

export { create, getAll, get, deliver, cancel, return_ };