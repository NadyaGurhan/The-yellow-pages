import axiosInstance from "../../shared/lib/axiosInstance";

export default class CompanyApi {
  static async getAllCompanies() {
    const response = await axiosInstance.get("/");
    return response;
  }

  static async getAllEvenCompanies() {
    const response = await axiosInstance.get("/even");
    return response;
  }

  static async getMyCompanies() {
    const response = await axiosInstance.get("/mynumbers");
    return response;
  }

  //по итогу обошлась без этого
  static async getOneCompany(id) {
    const response = await axiosInstance.get(`/${id}`);
    return response;
  }

  //закину на страницу добаавления компании
  static async createCompany(companyData) {
    const response = await axiosInstance.post("/add", companyData);
    return response;
  }

  //для обновления данных на странице моих компаний
  static async updateCompany(id, companyData) {
    const response = await axiosInstance.put(`/${id}`, companyData);
    return response;
  }
  //для удаления данных на странице моих компаний
  static async deleteCompany(id) {
    const response = await axiosInstance.delete(`/${id}`);
    return response;
  }
}
