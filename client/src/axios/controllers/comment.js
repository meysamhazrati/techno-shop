import axios from "../config";

const create = async (body) => await axios.post("/comments", body);

const getAll = async (page, length) => await axios.get("/comments", { params: { page, length } });

const update = async (id, body) => await axios.put(`/comments/${id}`, body);

const confirm = async (id) => await axios.put(`/comments/confirm/${id}`);

const reject = async (id) => await axios.put(`/comments/reject/${id}`);

const remove = async (id) => await axios.delete(`/comments/${id}`);

export { create, getAll, update, confirm, reject, remove };