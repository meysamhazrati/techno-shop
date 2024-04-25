import axios from "axios";

export default axios.create({
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