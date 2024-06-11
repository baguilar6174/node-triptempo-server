import { type PaginationDTO, type PaginationResponseEntity, type GetByIdDTO } from '../../shared';
import {
	type CreateScheduleDTO,
	type ScheduleEntity,
	type SchedulesDatasource,
	type SchedulesRepository,
	type UpdateScheduleDTO
} from '../domain';

export class RepositoryImpl implements SchedulesRepository {
	constructor(private readonly datasource: SchedulesDatasource) {}

	async getAllByRouteId(
		dto: GetByIdDTO<string>,
		paginationDTO: PaginationDTO
	): Promise<PaginationResponseEntity<ScheduleEntity[]>> {
		return await this.datasource.getAllByRouteId(dto, paginationDTO);
	}

	async getById(dto: GetByIdDTO<number>): Promise<ScheduleEntity> {
		return await this.datasource.getById(dto);
	}

	async create(dto: CreateScheduleDTO): Promise<ScheduleEntity> {
		return await this.datasource.create(dto);
	}

	async update(dto: UpdateScheduleDTO): Promise<ScheduleEntity> {
		return await this.datasource.update(dto);
	}

	async delete(dto: GetByIdDTO<number>): Promise<ScheduleEntity> {
		return await this.datasource.delete(dto);
	}
}
