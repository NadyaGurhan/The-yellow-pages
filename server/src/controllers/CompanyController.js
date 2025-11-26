const CompanyService = require("../services/CompanyService");
const { Company } = require("../../db/models");

class CompanyController {
  static async getAllCompanies(req, res) {
    try {
      const companies = await CompanyService.getAllCompanies();
      if (companies.length === 0)
        return res.status(400).json({ message: "Companies not found" });
      return res.json(companies);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  }

  static async getAllEvenCompanies(req, res) {
    try {
      const companies = await CompanyService.getAllEvenCompanies();
      if (companies.length === 0)
        return res.status(400).json({ message: "Companies not found" });
      return res.json(companies);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });2
    }
  }

  static async createCompany(req, res) {
    const { user } = res.locals;
    if (!req.body) return res.status(400).json({ message: "Нет данных" });
    const { companyName, phoneNumber } = req.body;
    const { isValid, err } = Company.validate({ companyName, phoneNumber });
    if (!isValid) return res.status(400).json({ message: err });

    try {
      const newCompany = await CompanyService.createCompany({
        companyName,
        phoneNumber,
        userId: user.id,
      });

      return res.status(201).json(newCompany);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  }

  static async getOneCompany(req, res) {
    const { id } = req.params;
    try {
      const company = await CompanyService.getOneCompanyById(id);
      if (!company)
        return res.status(404).json({ message: "Company not found" });
      return res.json(company);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  }

  static async updateCompany(req, res) {
    if (!req.body) return res.status(400).json({ message: "Нет данных" });
    const { companyName, phoneNumber } = req.body;
    const { isValid, err } = Company.validate({ companyName, phoneNumber });
    if (!isValid) return res.status(400).json({ message: err });
    const { id } = req.params;
    const { user } = res.locals;
    try {
      const updatedCompany = await CompanyService.editCompany({
        id,
        companyName,
        phoneNumber,
        userId: user.id,
      });
      if (!updatedCompany)
        return res.status(400).json({ message: "Company not found" });
      return res.json(updatedCompany);
    } catch (error) {
      console.log(error);
      if (error.message === "Вы не можете редактировать чужие записи") {
        return res.status(403).json({ message: "Нет прав на редактирование" });
      }
      return res.status(500).json({ message: "Server Error" });
    }
  }

  static async deleteCompany(req, res) {
    const { user } = res.locals;
    const { id } = req.params;
    try {
      const deletedCompany = await CompanyService.deleteOneCompany(id, user.id);
      if (!deletedCompany)
        return res.status(400).json({ message: "Company not found" });
      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      if (error.message === "Вы не можете удалять чужие записи") {
        return res.status(403).json({ message: "Нет прав на удаление" });
      }
      return res.status(500).json({ message: "Server Error" });
    }
  }

  static async getMyCompanies(req, res) {
    const { user } = res.locals;
    try {
      const companies = await CompanyService.getUsersCompanies(user.id);
      return res.json(companies);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  }
}

module.exports = CompanyController;
