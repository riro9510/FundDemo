import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Donations = sequelize.define(
  'Donations',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    donorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    donorEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USD',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.ENUM('credit_card', 'paypal', 'bank_transfer', 'other'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    timestamps: true,
    tableName: 'donations',
  }
);

export default Donations;
