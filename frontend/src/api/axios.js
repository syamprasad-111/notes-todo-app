import axios from "axios";

const API = axios.create({
  baseURL: "https://notes-todo-app-one.vercel.app/api",
});

// attach token automatically
API.interceptors.request.use((req)=>{
  const token=localStorage.getItem("token");
  if(token)
    req.headers.Authorization = `Bearer ${token}`; // we don't add headers manually again
  return req;
});

export default API;