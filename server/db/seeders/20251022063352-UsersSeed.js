"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface) {
    const password = "qwerty12345";
    const hashedPassword = await bcrypt.hash(password, 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Гюрхан Надежда",
          email: "nadya1@yellowpages.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Надя",
          email: "nadya2@example.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Надежда",
          email: "admin@yellowpages.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Companies", {}, {});
  },
};
