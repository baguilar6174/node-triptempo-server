import { type Response, type NextFunction, type Request } from 'express';
import { AppError, type ErrorResponse, HttpCode } from '../../../../core';
import {
	PrismaClientInitializationError,
	PrismaClientKnownRequestError,
	PrismaClientValidationError
} from '@prisma/client/runtime/library';

export class ErrorMiddleware {
	//* Dependency injection
	// constructor() {}

	public static handleError = (error: unknown, _: Request, res: Response<ErrorResponse>, next: NextFunction): void => {
		if (error instanceof AppError) {
			const { message, name, validationErrors } = error;
			const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
			res.statusCode = statusCode;
			res.json({ name, message, validationErrors });
		} else if (error instanceof PrismaClientInitializationError) {
			const { name } = error;
			const message = 'Verify the connection to the database!';
			const statusCode = HttpCode.INTERNAL_SERVER_ERROR;
			res.statusCode = statusCode;
			res.json({ name, message });
		} else if (error instanceof PrismaClientKnownRequestError) {
			const { meta, name } = error;
			const message = 'Error related to the request';
			const statusCode = HttpCode.BAD_REQUEST;
			res.statusCode = statusCode;
			const validationErrors = [
				{
					fields: meta ? (meta.target as string[]) : [],
					constraint: 'Error unique constraint violation'
				}
			];
			res.json({ name, message, validationErrors });
		} else if (error instanceof PrismaClientValidationError) {
			const { name, message } = error;
			const statusCode = HttpCode.BAD_REQUEST;
			res.statusCode = statusCode;
			res.json({ name, message });
		} else {
			const name = 'InternalServerError';
			const message = 'An internal server error occurred';
			const statusCode = HttpCode.INTERNAL_SERVER_ERROR;
			res.statusCode = statusCode;
			res.json({ name, message });
		}

		next();
	};
}
