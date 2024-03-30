import { type Response, type NextFunction, type Request } from 'express';
import { AppError, DEV_ENVIRONMENT, HttpCode, PROD_ENVIRONMENT } from '../../../../core';

export class ErrorMiddleware {
	//* Dependency injection
	// constructor() {}

	public static handleError = (error: unknown, _: Request, res: Response, next: NextFunction): void => {
		if (error instanceof AppError) {
			const { message, isOperational, name, stack } = error;
			const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
			if (process.env.NODE_ENV === DEV_ENVIRONMENT) {
				res.statusCode = statusCode;
				res.json({ name, message, stack });
			}
			if (process.env.NODE_ENV === PROD_ENVIRONMENT) {
				res.statusCode = isOperational ? statusCode : HttpCode.INTERNAL_SERVER_ERROR;
				res.json({ message: isOperational ? message : 'Something went very wrong!' });
			}
		}
		next();
	};
}
