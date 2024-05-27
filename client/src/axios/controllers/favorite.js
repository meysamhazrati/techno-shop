import axios from "../config";

const create = async ({ product }) => await axios.post("/favorites", { product });

const remove = async (id) => await axios.delete(`/favorites/${id}`);

export { create, remove };