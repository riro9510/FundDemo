import express from 'express';
import 'dotenv/config';
import { connectSequelize } from './db/sequelize.js';
import router from './routes/index.routes.js';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import https from 'http';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import jwt from 'jsonwebtoken';
import { validateClientIdWS } from './middlewares/token.middleware.js';

console.log('Iniciando aplicación...');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Donations API',
      version: '1.0.0',
      description: 'API para registrar y consultar donaciones (sesiones de 1 minuto).',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./dist/routes/*.js'],
};
console.log('Configurando Swagger...');
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 10000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use('/api', router);
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});
const allowedOrigins = ['http://localhost:3000','http://localhost:5173','https://funddemo.onrender.com'];

console.log('Conectando a Sequelize...');
connectSequelize();

app.use(
  cors({
    origin: function (origin, callback) {
      console.log('CORS origin:', origin);
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        console.error(msg, origin);
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

console.log('Creando servidor HTTP...');
const server = https.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Nueva conexión WebSocket');
  let timeoutHandle: NodeJS.Timeout | null = null;

  ws.on('message', async (msg) => {
    console.log('Mensaje recibido en WS:', msg.toString());
    try {
      const payload = JSON.parse(msg.toString());
      console.log('Payload parseado:', payload);
      const { clientId } = payload;

      if (!validateClientIdWS(payload, ws)) {
        console.warn('Validación de clientIdWS fallida:', payload);
        return;
      }

      const token = jwt.sign({ clientId }, process.env.JWT_SECRET!, { expiresIn: '300s' });
      console.log('Token generado:', token);

      ws.send(JSON.stringify({ type: 'ready', token, expiresIn: 300 }));

      if (timeoutHandle) clearTimeout(timeoutHandle);

      timeoutHandle = setTimeout(() => {
        console.log('Sesión expirada, cerrando WS');
        ws.send(JSON.stringify({ type: 'expired', message: 'Session expired' }));
        ws.close();
      }, 300_000); 

    } catch (err: any) {
      console.error('❌ WS error:', err);
      ws.send(
        JSON.stringify({
          type: 'error',
          message: 'Error processing request',
          stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        })
      );
    }
  });

  ws.on('close', () => {
    console.log('Conexión WS cerrada');
    if (timeoutHandle) clearTimeout(timeoutHandle);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor HTTP/WebSocket escuchando en puerto ${PORT}`);
});

export default app;
