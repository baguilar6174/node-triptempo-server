import { type NextFunction, type Request, type Response } from 'express';

import { GetByIdDTO } from '../../shared';
import { type SuccessResponse, type Params } from '../../../core';
import {
	CreateSchedule,
	type SchedulesRepository,
	type ScheduleEntity,
	CreateScheduleDTO,
	UpdateScheduleDTO,
	UpdateSchedule,
	GetScheduleById,
	DeleteSchedule
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

	public getById = (req: Request<Params>, res: Response<SuccessResponse<ScheduleEntity>>, next: NextFunction): void => {
		const { id } = req.params;
		const dto = GetByIdDTO.create<number>({ id });
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
		const dto = GetByIdDTO.create<number>({ id });
		new DeleteSchedule(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};
}
