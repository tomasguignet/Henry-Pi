const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      healthScore: {
        type: DataTypes.INTEGER,
      },
      instructions: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      dishTypes: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: "https://as1.ftcdn.net/v2/jpg/00/87/64/82/1000_F_87648201_jO23xggA2W2EjCdfqCTqliX9typRG9rp.jpg"
      }
    },
    { timestamps: false }
  );
};
