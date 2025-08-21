// db/sequelize.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.POSTGRES_URI!, {
  dialect: 'postgres',
  logging: false,
});

const connectSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL via Sequelize');
  } catch (error) {
    console.error('❌ Unable to connect to Sequelize DB:', error);
    process.exit(1);
  }
};

export { sequelize, connectSequelize };
export default sequelize;
