import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.listen(3000, () => console.log('API running on port 3000'));
