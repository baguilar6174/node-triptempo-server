import { type NextFunction, type Request, type Response } from 'express';

import { PaginationDto, type PaginationResponseEntity } from '../../shared';
import { ONE, TEN, type SuccessResponse } from '../../../core';
import { type CityEntity, GetCities, type CitiesRepository } from '../domain';

interface RequestQuery {
	page: string;
	limit: string;
}

export class Controller {
	//* Dependency injection
	constructor(private readonly repository: CitiesRepository) {}

	public getAll = (
		req: Request<unknown, unknown, unknown, RequestQuery>,
		res: Response<SuccessResponse<PaginationResponseEntity<CityEntity[]>>>,
		next: NextFunction
	): void => {
		const { page = ONE, limit = TEN } = req.query;
		const paginationDto = new PaginationDto(+page, +limit);
		new GetCities(this.repository)
			.execute(paginationDto)
			.then((result) => res.json({ data: result }))
			.catch((error) => {
				next(error);
			});
	};
}