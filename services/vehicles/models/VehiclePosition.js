const { DataTypes } = require('sequelize');
const sequelize = require('../../../shared/DBconfig');
const Vehicle = require('./Vehicle');

const VehiclePosition = sequelize.define(
  'VehiclePosition',
  {
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Vehicle,
        key: 'id',
      },
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    speed: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    recordedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'vehicle_positions',
    timestamps: true,
  }
);

Vehicle.hasMany(VehiclePosition, { foreignKey: 'vehicleId', as: 'positions' });
VehiclePosition.belongsTo(Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });

module.exports = VehiclePosition;
