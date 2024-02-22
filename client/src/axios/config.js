import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000",
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