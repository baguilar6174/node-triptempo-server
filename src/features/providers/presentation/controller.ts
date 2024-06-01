import { type NextFunction, type Request, type Response } from 'express';

import { PaginationDto, type PaginationResponseEntity } from '../../shared';
import { ONE, type SuccessResponse, TEN } from '../../../core';
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
		const paginationDto = PaginationDto.create({ page: +page, limit: +limit });
		const getProvidersDto = GetProvidersDto.create({ startCityId, endCityId });
		new GetProviders(this.repository)
			.execute(getProvidersDto, paginationDto)
			.then((result) => res.json({ result }))
			.catch(next);
	};
}
