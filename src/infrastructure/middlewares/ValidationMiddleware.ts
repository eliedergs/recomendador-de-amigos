import { NextFunction, Request, Response } from 'express';

import { validate, ValidationError } from 'class-validator';

import {
    ClassValidationOptions,
    ValidationErrorHandler,
} from '@/domain/interfaces/Utils/Validations';
import { extractMessages } from '@/infrastructure/utils/Validations';

export const validatePayload = (
    validateAs: any,
    from: 'body' | 'params' | 'query',
    options: ClassValidationOptions = {}
) => {
    const { errorHandler = sendErrors, ...validatorOptions } = options;

    return async (req: Request, res: Response, next: NextFunction) => {
        const toValidate = Object.assign(new validateAs(), req[from]);

        const errors = await validate(toValidate, validatorOptions);

        if (!!errors?.length) {
            return errorHandler(res, errors);
        }

        next();
    };
};

export const sendErrors: ValidationErrorHandler = (
    res: Response,
    errors: ValidationError[]
) => {
    res.status(400).json(extractMessages(errors));
};
