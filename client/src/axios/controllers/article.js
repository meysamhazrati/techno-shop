import axios from "../config";

const create = async ({ title, cover, body, isPublished, category }) => await axios.postForm("/articles", { title, cover, body, isPublished, category });

const getAll = async (categories, sort, page, length) => await axios.get("/articles", { params: { categories, sort, page, length } });

const get = async (id, commentsPage, commentsLength) => await axios.get(`/articles/${id}`, { params: { "comments-page": commentsPage, "comments-length": commentsLength } });

const update = async (id, { title, cover, body, isPublished }) => await axios.putForm(`/articles/${id}`, { title, cover, body, isPublished });

const publish = async (id) => await axios.put(`/articles/publish/${id}`);

const draft = async (id) => await axios.put(`/articles/draft/${id}`);

const confirm = async (id) => await axios.put(`/articles/confirm/${id}`);

const reject = async (id) => await axios.put(`/articles/reject/${id}`);

const remove = async (id) => await axios.delete(`/articles/${id}`);

export { create, getAll, get, update, publish, draft, confirm, reject, remove };