import axios from "../config";

const create = async ({ department, title, body }) => await axios.post("/tickets", { department, title, body });

const reply = async (id, { body }) => await axios.post(`/tickets/reply/${id}`, { body });

const getAll = async (page, length) => await axios.get("/tickets", { params: { page, length } });

const get = async (id) => await axios.get(`/tickets/${id}`);

const open = async (id) => await axios.put(`/tickets/open/${id}`);

const close = async (id) => await axios.put(`/tickets/close/${id}`);

const remove = async (id) => await axios.delete(`/tickets/${id}`);

export { create, reply, getAll, get, open, close, remove };