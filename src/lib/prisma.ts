import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../generated/prisma/client.js';

/**
 * Configuração central do Prisma Client.
 *
 * O adapter utiliza o driver PostgreSQL para estabelecer
 * a conexão com o banco configurado em DATABASE_URL.
 */
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL não foi definida no arquivo .env.');
}

const adapter = new PrismaPg({
  connectionString,
});

export const prisma = new PrismaClient({
  adapter,
});
