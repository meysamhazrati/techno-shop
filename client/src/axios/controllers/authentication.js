import axios from "../config";

const send = async ({ email }, type) => await axios.post("/authentication/send", { email }, { params: { type } });

const verify = async ({ email, code }) => await axios.post("/authentication/verify", { email, code });

const register = async ({ firstName, lastName, email, password }) => await axios.post("/authentication/register", {
  firstName,
  lastName,
  email,
  password,
});

const login = async ({ email, password }) => await axios.post("/authentication/login", { email, password });

const resetPassword = async ({ password }) => await axios.put("/authentication/resetPassword", { password });

const me = async () => await axios.get("/authentication/me");

const logout = async () => await axios.delete("/authentication/logout");

export { send, verify, register, login, resetPassword, me, logout };