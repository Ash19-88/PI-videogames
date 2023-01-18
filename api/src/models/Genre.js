const { DataTypes } = require("sequelize");
//Exportamos una función que define el modelo
//Luego le injectamos la conexión a sequelize.
module.exports = (sequelize) => {
  //defino el modelo
  sequelize.define(
    "Genre", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  { timestamps: false }
  );
};
