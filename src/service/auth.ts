import instance from "../lib/axios/instance";

interface RegisterData {
  username: string;
  password: string;
  email: string;
  nama: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RefreshTokenData {
  refreshToken: string;
}

const authServices = {
  registerUser: (data: RegisterData) =>
    instance.post("/api/auth/register", data),

  loginUser: (data: LoginData) => instance.post("/api/auth/login", data),

  refreshToken: (data: RefreshTokenData) =>
    instance.post("/api/auth/refresh-token", data),
};

export default authServices;
