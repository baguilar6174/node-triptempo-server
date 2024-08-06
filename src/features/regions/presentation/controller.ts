import { type NextFunction, type Request, type Response } from 'express';

import { PaginationDTO, type PaginationResponseEntity } from '../../shared';
import { ONE, type SuccessResponse, TEN, type RequestQuery } from '../../../core';
import { type RegionEntity, GetRegions, type RegionsRepository } from '../domain';

export class Controller {
	//* Dependency injection
	constructor(private readonly repository: RegionsRepository) {}

	public getAll = (
		req: Request<unknown, unknown, unknown, RequestQuery>,
		res: Response<SuccessResponse<PaginationResponseEntity<RegionEntity[]>>>,
		next: NextFunction
	): void => {
		const { page = ONE, limit = TEN } = req.query;
		const paginationDto = PaginationDTO.create({ page: +page, limit: +limit });
		new GetRegions(this.repository)
			.execute(paginationDto)
			.then((result) => res.json({ result }))
			.catch((error) => {
				next(error);
			});
	};
}
