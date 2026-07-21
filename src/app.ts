import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { authRoutes } from './routes/auth.routes';
import { mealsRoutes } from './routes/meals.routes';
import { foodRouter } from './routes/food.routes';
import { healthRoutes } from './routes/health.routes';

export const app = express();

// Lista de origens permitidas (seu localhost + seu domínio da Vercel + variável do env)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  env.frontendUrl,
].filter(Boolean); // Remove valores indefinidos se env.frontendUrl for opcional

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requisições sem origin (como mobile, cURL ou Postman) ou origens permitidas
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Bloqueado pelo CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/meals', mealsRoutes);
app.use('/foods', foodRouter);
app.use('/health-data', healthRoutes);
