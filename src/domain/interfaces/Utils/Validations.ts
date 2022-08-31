import { ValidatorOptions, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export type ValidationErrorHandler = (
    res: Response,
    err: ValidationError[],
) => void;

export type ClassValidationOptions = ValidatorOptions & {
    errorHandler?: ValidationErrorHandler;
};
