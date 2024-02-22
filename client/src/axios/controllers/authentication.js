import axios from "../config";

const send = async ({ email }, type) => await axios.post("/authentication/send", { email }, { params: { type } });

const verify = async ({ email, code }) => await axios.post("/authentication/verify", { email, code });

const register = async ({ firstName, lastName, phone, email, password }) => await axios.post("/authentication/register", {
  firstName,
  lastName,
  phone,
  email,
  password,
});

const login = async ({ identifier, password }) => await axios.post("/authentication/login", { identifier, password });

const me = async () => await axios.get("/authentication/me");

const logout = async () => await axios.delete("/authentication/logout");

export { send, verify, register, login, me, logout };