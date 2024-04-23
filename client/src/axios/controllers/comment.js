import axios from "../config";

const create = async ({ body, score, product, article }) => await axios.post("/comments", { body, score, product, article });

const getAll = async (page, length) => await axios.get("/comments", { params: { page, length } });

const confirm = async (id) => await axios.put(`/comments/confirm/${id}`);

const reject = async (id) => await axios.put(`/comments/reject/${id}`);

const remove = async (id) => await axios.delete(`/comments/${id}`);

export { create, getAll, confirm, reject, remove };