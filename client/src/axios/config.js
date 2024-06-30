import axios_ from "axios";

const axios = axios_.create({
  baseURL: `${process.env.SERVER_URI}/api`,
  headers: {
    post: {
      "Content-Type": "application/json",
    },
    put: {
      "Content-Type": "application/json",
    },
  },
  withCredentials: true,
});

axios.interceptors.response.use(({ status, data: { message, ...data } }) => Promise.resolve({ status, message, data }), ({ response }) => Promise.reject({ status: response.status, message: response.data.message }));

export default axios;