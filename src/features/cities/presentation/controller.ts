import { type NextFunction, type Request, type Response } from 'express';

import { GetByIdDTO } from '../../shared';
import { type SuccessResponse, type Params } from '../../../core';
import {
	type CityEntity,
	GetCities,
	type CitiesRepository,
	GetCityById,
	CreateCityDTO,
	CreateCity,
	DeleteCity
} from '../domain';

interface RequestBody {
	name: string;
	provinceId: string;
}

type RequestBodyCreate = RequestBody & {
	id: string;
};

export class Controller {
	//* Dependency injection
	constructor(private readonly repository: CitiesRepository) {}

	public getAll = (_: Request, res: Response<SuccessResponse<CityEntity[]>>, next: NextFunction): void => {
		new GetCities(this.repository)
			.execute()
			.then((result) => res.json({ result }))
			.catch((error) => {
				next(error);
			});
	};

	public getById = (req: Request<Params>, res: Response<SuccessResponse<CityEntity>>, next: NextFunction): void => {
		const { id } = req.params;
		const dto = GetByIdDTO.create<string>({ id });
		new GetCityById(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBodyCreate>,
		res: Response<SuccessResponse<CityEntity>>,
		next: NextFunction
	): void => {
		const dto = CreateCityDTO.create({ ...req.body });
		new CreateCity(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response<SuccessResponse<CityEntity>>, next: NextFunction): void => {
		const { id } = req.params;
		const dto = GetByIdDTO.create<string>({ id });
		new DeleteCity(this.repository)
			.execute(dto)
			.then((result) => res.json({ result }))
			.catch(next);
	};
}
