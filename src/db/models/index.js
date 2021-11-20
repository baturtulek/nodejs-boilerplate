const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const loadModels = (DB, sequelize) => {
  const baseName = path.basename(__filename);
  fs.readdirSync(__dirname)
    .filter((file) => {
      return file !== baseName && file.endsWith(".js");
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      DB[model.name] = model;
    });
};

const makeModelAssociations = (DB) => {
  Object.keys(DB).forEach((modelName) => {
    if (DB[modelName].associate) {
      DB[modelName].associate(DB);
    }
  });
};

module.exports = { loadModels, makeModelAssociations };
