import { type Response, type NextFunction, type Request } from 'express';
import { AppError, ONE, jsonwebtokenAdapter } from '../../../../core';

import { type AuthRepository, GetUser, GetUserDTO } from '../../../auth';

export class AuthMiddleware {
	//* Dependency injection
	constructor(private readonly repository: AuthRepository) {}

	public validateJWT = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
		try {
			const authorization = req.header('Authorization');

			if (!authorization) throw AppError.unauthorized('Unauthorized (no authorization header)');

			if (!authorization.startsWith('Bearer ')) {
				throw AppError.unauthorized('Invalid authorization header (Bearer token required)');
			}

			const token = authorization.split(' ').at(ONE) ?? '';
			const payload = await jsonwebtokenAdapter.validateToken<{ id: string }>(token);

			if (!payload) throw AppError.unauthorized('Invalid token');

			const dto = GetUserDTO.create({ id: payload.id });
			const user = await new GetUser(this.repository).execute(dto);

			req.body.user = user;
			next();
		} catch (error) {
			next(error);
		}
	};
}
