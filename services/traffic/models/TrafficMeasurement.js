const { DataTypes } = require('sequelize');
const sequelize = require('../../../shared/DBconfig');
const TrafficZone = require('./TrafficZone');

const TrafficMeasurement = sequelize.define(
  'TrafficMeasurement',
  {
    zoneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TrafficZone,
        key: 'id',
      },
    },
    vehicleCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speedAverage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    density: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    congestionLevel: {
      type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
      allowNull: false,
    },
  },
  {
    tableName: 'traffic_measurements',
    timestamps: true,
  }
);

TrafficZone.hasMany(TrafficMeasurement, { foreignKey: 'zoneId', as: 'measurements' });
TrafficMeasurement.belongsTo(TrafficZone, { foreignKey: 'zoneId', as: 'zone' });

module.exports = TrafficMeasurement;
