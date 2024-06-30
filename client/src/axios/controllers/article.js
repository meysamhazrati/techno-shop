import axios from "../config";

const create = async (body) => await axios.postForm("/articles", body);

const getAll = async (categories, onlyPublished, sort, page, length) => await axios.get("/articles", { params: { categories, "only-published": onlyPublished, sort, page, length } });

const get = async (id, commentsPage, commentsLength) => await axios.get(`/articles/${id}`, { params: { "comments-page": commentsPage, "comments-length": commentsLength } });

const update = async (id, body) => await axios.putForm(`/articles/${id}`, body);

const publish = async (id) => await axios.put(`/articles/publish/${id}`);

const draft = async (id) => await axios.put(`/articles/draft/${id}`);

const remove = async (id) => await axios.delete(`/articles/${id}`);

export { create, getAll, get, update, publish, draft, remove };