import axios from "../config";

const register = async (body) => await axios.post("/authentication/register", body);

const login = async (body) => await axios.post("/authentication/login", body);

const resetPassword = async (body) => await axios.put("/authentication/reset-password", body);

const me = async () => await axios.get("/authentication/me");

const logout = async () => await axios.delete("/authentication/logout");

export { register, login, resetPassword, me, logout };