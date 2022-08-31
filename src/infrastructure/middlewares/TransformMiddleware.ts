import { IResponseError } from '@/domain/interfaces/Response/IResponse';
import { NextFunction, Request, Response } from 'express';

export const transformPayload = (
    transformer: Function,
    from: 'body' | 'params' | 'query'
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req[from] = transformer(req[from]);
            next();
        } catch (error) {
            return res.status(500).json({
                message: 'Não foi possível processar os dados recebidos',
            } as IResponseError);
        }
    };
};
