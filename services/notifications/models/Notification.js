const { DataTypes } = require('sequelize');
const sequelize = require('../../../shared/DBconfig');

const Notification = sequelize.define(
  'Notification',
  {
    recipientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'notifications',
    timestamps: true,
  }
);

module.exports = Notification;
