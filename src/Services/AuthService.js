import api from "./Api";

export const registerUser = (data) =>
  api.post("/Auth/register", data);

export const loginUser = (data) =>
  api.post("/Auth/login", data);