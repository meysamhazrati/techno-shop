import axios from "../config";

const create = async (body) => await axios.post("/favorites", body);

const remove = async (id) => await axios.delete(`/favorites/${id}`);

export { create, remove };