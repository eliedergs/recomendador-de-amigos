import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import Storage from './infrastructure/storage';
import { router } from './routes';

export const initServer = async () => {
  const app = express();

  Storage.initializeCache();

  app.use(express.json());
  app.use(cors());
  app.use(router);
  const server = await app.listen(3000);

  return { app, server };
};
