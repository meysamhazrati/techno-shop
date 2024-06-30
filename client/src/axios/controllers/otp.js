import axios from "../config";

const send = async (type, body) => await axios.post("/otps", body, { params: { type } });

const verify = async (body) => await axios.post("/otps/verify", body);

export { send, verify };