import { type NextFunction, type Request, type Response } from 'express';

import { GetByIdDTO, PaginationDTO, type PaginationResponseEntity } from '../../shared';
import { ONE, type SuccessResponse, TEN, type RequestQuery, type Params } from '../../../core';
import {
	GetTripItineraries,
	CreateProvider,
	type TripItineraryEntity,
	type ProvidersRepository,
	type ProviderEntity,
	GetTripItineraryDTO,
	CreateProviderDTO,
	UpdateProviderDTO,
	UpdateProvider,
	GetProviderById,
	GetProviders,
	DeleteProvider
} from '../domain';

type RequestQueryTripItineraries = RequestQuery & {
	startCityId: string;
	endCityId: string;
};

interface RequestBody {
	name: string;
	logo: string | null;
	details: string | null;
}

type RequestBodyCreate = RequestBody & {
	id: string;
};

export class Controller {
	//* Dependency injection
	constructor(private readonly repository: ProvidersRepository) {}

	public getTripItineraries = (
		req: Request<unknown, unknown, unknown, RequestQueryTripItineraries>,
		res: Response<SuccessResponse<PaginationResponseEntity<TripItineraryEntity[]>>>,
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

	public getAll = (
		req: Request<unknown, unknown, unknown, RequestQuery>,
		res: Response<SuccessResponse<ProviderEntity[]>>,
		next: NextFunction
	): void => {
		new GetProviders(this.repository)
			.execute()
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public getById = (req: Request<Params>, res: Response<SuccessResponse<ProviderEntity>>, next: NextFunction): void => {
		const { id } = req.params;
		const dto = GetByIdDTO.create<string>({ id });
		new GetProviderById(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBodyCreate>,
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

	public update = (
		req: Request<Params, unknown, RequestBody>,
		res: Response<SuccessResponse<ProviderEntity>>,
		next: NextFunction
	): void => {
		const { id } = req.params;
		const { name, logo, details } = req.body;
		const dto = UpdateProviderDTO.create({ id, name, logo, details });
		new UpdateProvider(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response<SuccessResponse<ProviderEntity>>, next: NextFunction): void => {
		const { id } = req.params;
		const dto = GetByIdDTO.create<string>({ id });
		new DeleteProvider(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};
}
