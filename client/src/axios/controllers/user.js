import axios from "../config";

const getAll = async (page, length) => await axios.get("/users", { params: { page, length } });

const get = async (id) => await axios.get(`/users/${id}`);

const edit = async ({ firstName, lastName, currentPassword, newPassword, avatar }) => await axios.putForm("/users", { firstName, lastName, currentPassword, newPassword, avatar });

const update = async (id, { firstName, lastName, phone, email, password, role, avatar }) => await axios.putForm(`/users/${id}`, { firstName, lastName, phone, email, password, role, avatar });

const addToCart = async (id, { color }) => await axios.put(`/users/cart/add/${id}`, { color });

const removeFromCart = async (id, { color }) => await axios.put(`/users/cart/remove/${id}`, { color });

const emptyCart = async () => await axios.put("/users/cart/empty");

const addToFavorites = async (id) => await axios.put(`/users/favorites/add/${id}`);

const removeFromFavorites = async (id) => await axios.put(`/users/favorites/remove/${id}`);

const emptyFavorites = async () => await axios.put("/users/favorites/empty");

const ban = async (id) => await axios.put(`/users/ban/${id}`);

const unBan = async (id) => await axios.put(`/users/un-ban/${id}`);

const remove = async (id) => await axios.delete(`/users/${id}`);

export { getAll, get, edit, update, addToCart, removeFromCart, emptyCart, addToFavorites, removeFromFavorites, emptyFavorites, ban, unBan, remove };