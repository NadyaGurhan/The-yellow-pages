const { Company } = require("../../db/models");

class CompanyService {
  static async getAllCompanies() {
    return Company.findAll({
      order: [["companyName", "ASC"]],
    });
  }

  static async getAllEvenCompanies() {
    const companies = await Company.findAll();
    const filtered = companies.filter((el) => el.id % 2 === 0);
    return filtered;
  }

  static async createCompany({ companyName, phoneNumber, userId }) {
    return Company.create({ companyName, phoneNumber, userId });
  }

  static async getOneCompanyById(id) {
    return Company.findByPk(id);
  }

  static async editCompany({ id, companyName, phoneNumber, userId }) {
    const company = await this.getOneCompanyById(id);
    if (!company) {
      return null;
    }
    if (company.userId !== userId) {
      throw new Error("Вы не можете редактировать чужие записи");
    }
    //пока кумекаю, оставить здесь проверку или нет, потому что точно буду использовать верифайтокен +на делит
    await company.update({ companyName, phoneNumber });
    return company;
  }

  static async deleteOneCompany(id, userId) {
    const company = await this.getOneCompanyById(id);
    if (!company) return null;
    if (company.userId !== userId) {
      throw new Error("Вы не можете удалять чужие записи");
    }

    await company.destroy();
    return true;
  }

  static async getUsersCompanies(userId) {
    return Company.findAll({
      where: { userId },
      order: [["companyName", "ASC"]],
      // include: ["User"], // пока везде подключила юзера, но, может, и не пригодится, пусть пока побудет
    });
  }
}

module.exports = CompanyService;
