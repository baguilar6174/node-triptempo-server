import { type NextFunction, type Request, type Response } from 'express';

import { PaginationDto, type PaginationResponseEntity } from '../../shared';
import { ONE, type SuccessResponse, TEN } from '../../../core';
import { type ResultEntity, type ProvidersRepository, GetResults } from '../domain';
import { GetResultssDto } from '../domain/dtos';

interface RequestQuery {
	page: string;
	limit: string;
	startCityId: string;
	endCityId: string;
}

export class Controller {
	//* Dependency injection
	constructor(private readonly repository: ProvidersRepository) {}

	public getResults = (
		req: Request<unknown, unknown, unknown, RequestQuery>,
		res: Response<SuccessResponse<PaginationResponseEntity<ResultEntity[]>>>,
		next: NextFunction
	): void => {
		const { startCityId, endCityId, page = ONE, limit = TEN } = req.query;
		const paginationDto = PaginationDto.create({ page: +page, limit: +limit });
		const getResultsDto = GetResultssDto.create({ startCityId, endCityId });
		new GetResults(this.repository)
			.execute(getResultsDto, paginationDto)
			.then((result) => res.json({ result }))
			.catch(next);
	};
}
