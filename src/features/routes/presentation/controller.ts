import { type NextFunction, type Request, type Response } from 'express';

import { GetByIdDTO } from '../../shared';
import { type SuccessResponse, type Params } from '../../../core';
import {
	CreateRoute,
	type RoutesRepository,
	type RouteEntity,
	CreateRouteDTO,
	UpdateRouteDTO,
	UpdateRoute,
	GetRouteById,
	GetRoutes,
	DeleteRoute
} from '../domain';

interface RequestBody {
	startCityId: string;
	endCityId: string;
	distance: number;
	price: number;
	estimatedTravelTime: number;
	transportationProviderId: string;
}

type RequestBodyCreate = RequestBody & {
	id: string;
};

export class Controller {
	//* Dependency injection
	constructor(private readonly repository: RoutesRepository) {}

	public getAll = (_: Request, res: Response<SuccessResponse<RouteEntity[]>>, next: NextFunction): void => {
		new GetRoutes(this.repository)
			.execute()
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public getById = (req: Request<Params>, res: Response<SuccessResponse<RouteEntity>>, next: NextFunction): void => {
		const { id } = req.params;
		const dto = GetByIdDTO.create<string>({ id });
		new GetRouteById(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBodyCreate>,
		res: Response<SuccessResponse<RouteEntity>>,
		next: NextFunction
	): void => {
		const dto = CreateRouteDTO.create({ ...req.body });
		new CreateRoute(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public update = (
		req: Request<Params, unknown, RequestBody>,
		res: Response<SuccessResponse<RouteEntity>>,
		next: NextFunction
	): void => {
		const { id } = req.params;
		const dto = UpdateRouteDTO.create({ id, ...req.body });
		new UpdateRoute(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response<SuccessResponse<RouteEntity>>, next: NextFunction): void => {
		const { id } = req.params;
		const dto = GetByIdDTO.create<string>({ id });
		new DeleteRoute(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};
}
