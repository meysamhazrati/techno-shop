import axios from "../config";

const getAll = async (page, length) => await axios.get("/users", { params: { page, length } });

const get = async (id) => await axios.get(`/users/${id}`);

const edit = async (body) => await axios.putForm("/users", body);

const update = async (id, body) => await axios.putForm(`/users/${id}`, body);

const addToCart = async (id, body) => await axios.put(`/users/cart/add/${id}`, body);

const removeFromCart = async (id, body) => await axios.put(`/users/cart/remove/${id}`, body);

const emptyCart = async () => await axios.put("/users/cart/empty");

const ban = async (id) => await axios.put(`/users/ban/${id}`);

const unBan = async (id) => await axios.put(`/users/un-ban/${id}`);

const remove = async (id) => await axios.delete(`/users/${id}`);

export { getAll, get, edit, update, addToCart, removeFromCart, emptyCart, ban, unBan, remove };