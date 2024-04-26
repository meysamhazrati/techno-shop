import axios from "../config";

const sendOTP = async ({ email }, type) => await axios.post("/authentication/otp/send", { email }, { params: { type } });

const verifyOTP = async ({ email, code }) => await axios.post("/authentication/otp/verify", { email, code });

const register = async ({ firstName, lastName, email, password }) => await axios.post("/authentication/register", { firstName, lastName, email, password });

const login = async ({ email, password }) => await axios.post("/authentication/login", { email, password });

const resetPassword = async ({ email, password }) => await axios.put("/authentication/reset-password", { email, password });

const me = async () => await axios.get("/authentication/me");

const logout = async () => await axios.delete("/authentication/logout");

export { sendOTP, verifyOTP, register, login, resetPassword, me, logout };