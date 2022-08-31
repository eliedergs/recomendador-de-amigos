import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
    return res.status(200).json({ message: 'Api is running' });
});

export { router };
