import axiosInstance from "../../shared/lib/axiosInstance";


export default class UserApi {
  static async signup(userData) {
    const response = await axiosInstance.post("/signup", userData);
    return response;
  }

  static async login(userData) {
    const response = await axiosInstance.post("/signin", userData);
    return response;
  }

  static async logout() {
    const response = await axiosInstance("/logout");
    return response;
  }
}
