import express from 'express';
import 'dotenv/config';
import { connectSequelize } from './db/sequelize.js';
import router from './routes/index.routes.js';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import https from 'http';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Donations API',
      version: '1.0.0',
      description: 'API para registrar y consultar donaciones (sesiones de 1 minuto).',
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 10000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use('/api', router);

const allowedOrigins = ['http://localhost:3000'];

connectSequelize();
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use('/api', router);

const server = https.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor HTTP/WebSocket escuchando en puerto ${PORT}`);
});

export default app;
