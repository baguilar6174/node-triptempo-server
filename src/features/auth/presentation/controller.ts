// src/features/auth/presentation/controller.ts

import { type NextFunction, type Request, type Response } from 'express';

import { HttpCode, type SuccessResponse } from '../../../core';
import {
	type AuthRepository,
	RegisterUserDTO,
	LoginUser,
	type AuthEntity,
	RegisterUser,
	LoginUserDTO
} from '../domain';

interface RequestBodyLogin {
	email: string;
	password: string;
}

type RequestBodyRegister = RequestBodyLogin & {
	name: string;
};

export class AuthController {
	//* Dependency injection
	constructor(private readonly repository: AuthRepository) {}

	public login = (
		req: Request<unknown, unknown, RequestBodyLogin>,
		res: Response<SuccessResponse<AuthEntity>>,
		next: NextFunction
	): void => {
		const dto = LoginUserDTO.create({ ...req.body });
		new LoginUser(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public register = (
		req: Request<unknown, unknown, RequestBodyRegister>,
		res: Response<SuccessResponse<AuthEntity>>,
		next: NextFunction
	): void => {
		const dto = RegisterUserDTO.create({ ...req.body });
		new RegisterUser(this.repository)
			.execute(dto)
			.then((result) => res.status(HttpCode.CREATED).json({ result }))
			.catch(next);
	};
}
