import { app } from './app';
import { env } from './config/env';

// Garante que a porta venha da variável de ambiente no Railway (se existir) ou da sua config
const PORT = Number(process.env.PORT || env.port || 3333);

// Em servidores de hospedagem como o Railway, o host '0.0.0.0' é OBRIGATÓRIO
app.listen(PORT, '0.0.0.0', () => {
  console.log(`SiNutre back rodando na porta ${PORT}`);
});
