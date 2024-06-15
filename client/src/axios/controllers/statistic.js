import axios from "../config";

const getAll = async () => await axios.get("/statistics");

export { getAll };