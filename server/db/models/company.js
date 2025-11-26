"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
    static validate({ companyName, phoneNumber }) {
      if (
        !companyName ||
        typeof companyName !== "string" ||
        companyName.trim().length === 0
      ) {
        return {
          isValid: false,
          err: "Поле 'Название компании' не должно быть пустым и не должно быть числом",
        };
      }
      if (!phoneNumber || phoneNumber.trim().length === 0) {
        return {
          isValid: false,
          err: "Поле 'Телефонный номер' не должно быть пустым",
        };
      }
      const cleanPhone = phoneNumber.replace(/\s/g, "");
      if (cleanPhone.length < 10) {
        return {
          isValid: false,
          err: "Телефон должен содержать минимум 10 цифр",
        };
      }

      return { isValid: true, err: null };
    }
  }

  Company.init(
    {
      companyName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
