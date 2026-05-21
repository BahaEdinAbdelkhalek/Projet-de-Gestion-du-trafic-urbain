const { DataTypes } = require('sequelize');
const sequelize = require('../../../shared/DBconfig');

const Vehicle = sequelize.define(
  'Vehicle',
  {
    plateNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    tableName: 'vehicles',
    timestamps: true,
  }
);

module.exports = Vehicle;
