import { type NextFunction, type Request, type Response } from 'express';

import { GetByIdDTO, PaginationDTO, type PaginationResponseEntity } from '../../shared';
import { type SuccessResponse, type Params, ONE, TEN, type RequestQuery } from '../../../core';
import {
	CreateSchedule,
	type SchedulesRepository,
	type ScheduleEntity,
	CreateScheduleDTO,
	UpdateScheduleDTO,
	UpdateSchedule,
	GetScheduleById,
	DeleteSchedule,
	GetSchedulesByRouteId
} from '../domain';

interface RequestBody {
	routeId: string;
	departureTime: string;
	isAvailable: boolean;
}

type RequestBodyCreate = RequestBody & {
	id: string;
};

export class Controller {
	//* Dependency injection
	constructor(private readonly repository: SchedulesRepository) {}

	public getAllByRouteId = (
		req: Request<Params, unknown, unknown, RequestQuery>,
		res: Response<SuccessResponse<PaginationResponseEntity<ScheduleEntity[]>>>,
		next: NextFunction
	): void => {
		const { id } = req.params;
		const { page = ONE, limit = TEN } = req.query;
		const dto = GetByIdDTO.create<string>({ id });
		const paginationDTO = PaginationDTO.create({ page: +page, limit: +limit });
		new GetSchedulesByRouteId(this.repository)
			.execute(dto, paginationDTO)
			.then((result) => res.json({ result }))
			.catch((error) => {
				next(error);
			});
	};

	public getById = (req: Request<Params>, res: Response<SuccessResponse<ScheduleEntity>>, next: NextFunction): void => {
		const { id } = req.params;
		const dto = GetByIdDTO.create<number>({ id: +id });
		new GetScheduleById(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBodyCreate>,
		res: Response<SuccessResponse<ScheduleEntity>>,
		next: NextFunction
	): void => {
		const dto = CreateScheduleDTO.create({ ...req.body });
		new CreateSchedule(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public update = (
		req: Request<Params, unknown, RequestBody>,
		res: Response<SuccessResponse<ScheduleEntity>>,
		next: NextFunction
	): void => {
		const { id } = req.params;
		const dto = UpdateScheduleDTO.create({ id, ...req.body });
		new UpdateSchedule(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response<SuccessResponse<ScheduleEntity>>, next: NextFunction): void => {
		const { id } = req.params;
		const dto = GetByIdDTO.create<number>({ id: +id });
		new DeleteSchedule(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};
}
