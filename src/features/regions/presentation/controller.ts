import { type NextFunction, type Request, type Response } from 'express';

import { type SuccessResponse, type RequestQuery } from '../../../core';
import { type RegionEntity, GetRegions, type RegionsRepository } from '../domain';

export class Controller {
	//* Dependency injection
	constructor(private readonly repository: RegionsRepository) {}

	public getAll = (
		req: Request<unknown, unknown, unknown, RequestQuery>,
		res: Response<SuccessResponse<RegionEntity[]>>,
		next: NextFunction
	): void => {
		new GetRegions(this.repository)
			.execute()
			.then((result) => res.json({ result }))
			.catch((error) => {
				next(error);
			});
	};
}
