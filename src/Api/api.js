import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050",
});

export const insertUser = (payload) => api.post("/signup", payload);
export const loginUser = (payload) => api.post("/login", payload);
export const findTeam = (payload) => api.post("/findteam", payload);
export const searchUser = (payload) => api.post("/search", payload);
export const addUser = (payload) => api.post("/adduser", payload);
export const removeUser = (payload) => api.post("/removeuser", payload);
export const getLogs = (payload) => api.post("/getLogs", payload);

const apis = {
  insertUser,
  loginUser,
  findTeam,
  searchUser,
  addUser,
  removeUser,
  getLogs,
};

export default apis;
