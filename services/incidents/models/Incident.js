const { DataTypes } = require('sequelize');
const sequelize = require('../../../shared/DBconfig');

const Incident = sequelize.define(
  'Incident',
  {
    type: {
      type: DataTypes.ENUM('accident', 'works', 'road_closed', 'traffic_jam'),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('reported', 'in_progress', 'resolved'),
      allowNull: false,
      defaultValue: 'reported',
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    zoneId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reporterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'incidents',
    timestamps: true,
  }
);

module.exports = Incident;
