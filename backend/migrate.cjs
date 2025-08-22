require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Configuración de la DB
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  logging: console.log,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Definición de la tabla Donations
const Donations = sequelize.define(
  'donations',
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
      validate: { isEmail: true },
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
    tableName: 'donations',
    timestamps: true,
  }
);

// Función para crear la tabla
const migrate = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la DB');
    await Donations.sync({ alter: true }); // Esto crea o actualiza la tabla
    console.log('✅ Migración completada');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error en la migración:', err);
    process.exit(1);
  }
};

migrate();
