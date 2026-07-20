import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { swaggerDocument } from './docs/swagger.js';
import { errorHandler } from './middlewares/error-handler.middleware.js';
import { routes } from './routes/index.js';

export const app = express();

// Permite que aplicações front-end consumam a API.
app.use(cors());

// Converte automaticamente o body das requisições para JSON.
app.use(express.json());

app.get('/health', (_request, response) => {
  return response.status(200).json({
    status: 'ok',
    message: 'Task Management API is running',
  });
});

// Disponibiliza uma documentação da API.
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Registra todas as rotas da aplicação.
app.use(routes);

// Deve ser registrado depois das rotas para capturar os erros encaminhados.
app.use(errorHandler);
