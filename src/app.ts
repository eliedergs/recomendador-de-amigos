import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { router } from './routes';

export const initServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(router);
    const server = app.listen(3000);

    return { app, server };
};
