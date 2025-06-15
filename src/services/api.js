import axios from "axios";

// const URL = "http://localhost:3000/";
const URL = "https://dune-scalloped-age.glitch.me/";

export const fetchLogin = async (values) => {
  return axios.post(`${URL}api/auth/login`, values);
};

export const fetchSignup = async (values) => {
  return axios.post(`${URL}api/auth/signup`, values);
};

export const createPost = async (formData) => {
  return axios.post(`${URL}posts`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getPosts = async () => {
  return axios.get(`${URL}posts`);
};

export const updatePost = async (postId, values) => {
  return axios.patch(`${URL}posts/${postId}`, values);
};

export const deletePost = async (postId) => {
  return axios.delete(`${URL}posts/${postId}`);
};

export const getCategoties = async () => {
  return axios.get(`${URL}posts/categories`);
};
