import { type NextFunction, type Request, type Response } from 'express';

import { type SuccessResponse } from '../../../core';
import { type ProvincesEntity, GetProvinces, type ProvincesRepository } from '../domain';

export class Controller {
	//* Dependency injection
	constructor(private readonly repository: ProvincesRepository) {}

	public getAll = (_: Request, res: Response<SuccessResponse<ProvincesEntity[]>>, next: NextFunction): void => {
		new GetProvinces(this.repository)
			.execute()
			.then((result) => res.json({ result }))
			.catch((error) => {
				next(error);
			});
	};
}
