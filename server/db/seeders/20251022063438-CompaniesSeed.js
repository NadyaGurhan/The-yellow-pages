"use strict";


module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Companies",
      [
        {
          companyName: "АльфаБанк",
          phoneNumber: "+7 (812) 111-11-00",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyName: "ТинькоффБанк",
          phoneNumber: "+7 (800) 222-33-11",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      
        {
          companyName: "Гроздья Отчаяния",
          phoneNumber: "+7 (812) 555-11-00",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyName: "Ежовые ноговицы-руковицы",
          phoneNumber: "+7 (499) 000-99-00",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyName: 'Кафе "Щегол"',
          phoneNumber: "+7 (812) 123-45-67",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyName: 'Кафе "Хачапурня"',
          phoneNumber: "+7 (495) 000-43-21",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyName: 'Булочная Вольчека',
          phoneNumber: "+7 (960) 909-87-65",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyName: "Грузовичков",
          phoneNumber: "+7 (812) 000-00-80",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
