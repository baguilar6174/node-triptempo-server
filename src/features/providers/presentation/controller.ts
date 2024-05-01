import { type NextFunction, type Request, type Response } from 'express';

import { PaginationDto, type PaginationResponseEntity } from '../../shared';
import { ONE, TEN, type SuccessResponse } from '../../../core';
import { type ProviderEntity, GetProviders, type ProvidersRepository } from '../domain';
import { GetProvidersDto } from '../domain/dtos';

interface RequestQuery {
	page: string;
	limit: string;
	startCityId: string;
	endCityId: string;
}

export class Controller {
	//* Dependency injection
	constructor(private readonly repository: ProvidersRepository) {}

	public getProviders = (
		req: Request<unknown, unknown, unknown, RequestQuery>,
		res: Response<SuccessResponse<PaginationResponseEntity<ProviderEntity[]>>>,
		next: NextFunction
	): void => {
		const { startCityId, endCityId, page = ONE, limit = TEN } = req.query;
		const paginationDto = new PaginationDto(+page, +limit);
		const getProvidersDto = new GetProvidersDto(startCityId, endCityId);
		new GetProviders(this.repository)
			.execute(getProvidersDto, paginationDto)
			.then((result) => res.json({ data: result }))
			.catch((error) => {
				next(error);
			});
	};
}
