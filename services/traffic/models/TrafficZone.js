const { DataTypes } = require('sequelize');
const sequelize = require('../../../shared/DBconfig');

const TrafficZone = sequelize.define(
  'TrafficZone',
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    coordinates: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'traffic_zones',
    timestamps: true,
  }
);

module.exports = TrafficZone;
