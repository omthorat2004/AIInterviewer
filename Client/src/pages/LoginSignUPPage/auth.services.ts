import axiosInstance from "../../api/axiosInstance";

interface SignupData {
  email: string;
  password: string;
  name: string;
  organizationName: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const signupApi = (data: SignupData) =>
  axiosInstance.post("/recruiter/signup", data);

export const loginApi = (data: LoginData) =>
  axiosInstance.post("/recruiter/login", data);

export const verifyApi = () =>
  axiosInstance.get("/recruiter/verify");

