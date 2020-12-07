import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const insertUser = (payload) => api.post("/signup", payload);
export const loginUser = (payload) => api.post("/login", payload);
export const findTeam = (payload) => api.post("/findteam", payload);
export const searchUser = (payload) => api.post("/search", payload);
export const addUser = (payload) => api.post("/adduser", payload);
export const removeUser = (payload) => api.post("/removeuser", payload);
export const getLogs = (payload) => api.post("/getLogs", payload);
export const getLogsByText = (payload) => api.post("/getLogsByText", payload);
export const getLogsByRegex = (payload) => api.post("/getLogsByRegex", payload);
export const exportLogs = (payload) =>
  api.post("/exportLogs", { ...payload, responseType: "blob" });
export const pinLog = (payload) => api.post("/pinLogs", payload);
export const unpinLog = (payload) => api.post("/removePinLogs", payload);
export const getPinnedLogs = (payload) => api.post("/getPinnedLogs", payload);

const apis = {
  insertUser,
  loginUser,
  findTeam,
  searchUser,
  addUser,
  removeUser,
  getLogs,
  getLogsByText,
  getLogsByRegex,
  exportLogs,
  pinLog,
  unpinLog,
  getPinnedLogs,
};

export default apis;
