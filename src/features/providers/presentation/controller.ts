import { type NextFunction, type Request, type Response } from 'express';

import { PaginationDTO, type PaginationResponseEntity } from '../../shared';
import { ONE, type SuccessResponse, TEN } from '../../../core';
import {
	type TripItinerary,
	type ProvidersRepository,
	GetTripItineraries,
	type ProviderEntity,
	CreateProvider
} from '../domain';
import { CreateProviderDTO, GetTripItineraryDTO } from '../domain/dtos';

interface RequestQuery {
	page: string;
	limit: string;
	startCityId: string;
	endCityId: string;
}

interface RequestBody {
	id: string;
	name: string;
	logo: string | null;
	details: string | null;
}

export class Controller {
	//* Dependency injection
	constructor(private readonly repository: ProvidersRepository) {}

	public getTripItineraries = (
		req: Request<unknown, unknown, unknown, RequestQuery>,
		res: Response<SuccessResponse<PaginationResponseEntity<TripItinerary[]>>>,
		next: NextFunction
	): void => {
		const { startCityId, endCityId, page = ONE, limit = TEN } = req.query;
		const paginationDTO = PaginationDTO.create({ page: +page, limit: +limit });
		const dto = GetTripItineraryDTO.create({ startCityId, endCityId });
		new GetTripItineraries(this.repository)
			.execute(dto, paginationDTO)
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBody>,
		res: Response<SuccessResponse<ProviderEntity>>,
		next: NextFunction
	): void => {
		const { id, name, logo, details } = req.body;
		const dto = CreateProviderDTO.create({ id, name, logo, details });
		new CreateProvider(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};
}
