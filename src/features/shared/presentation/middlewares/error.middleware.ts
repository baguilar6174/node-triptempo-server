import { type Response, type NextFunction, type Request } from 'express';
import { AppError, type ErrorResponse, HttpCode } from '../../../../core';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

export class ErrorMiddleware {
	//* Dependency injection
	// constructor() {}

	public static handleError = (error: unknown, _: Request, res: Response<ErrorResponse>, next: NextFunction): void => {
		if (error instanceof AppError) {
			const { message, name, stack, validationErrors } = error;
			const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
			res.statusCode = statusCode;
			res.json({ name, message, validationErrors, stack });
		} else if (error instanceof PrismaClientInitializationError) {
			const name = 'PrismaClientInitializationError';
			const message = 'Verify the connection to the database!';
			const statusCode = HttpCode.INTERNAL_SERVER_ERROR;
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
