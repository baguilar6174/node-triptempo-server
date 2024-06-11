import { type PaginationDTO, type PaginationResponseEntity, type GetByIdDTO } from '../../../shared';
import { type UpdateScheduleDTO, type CreateScheduleDTO } from '../dtos';
import { type ScheduleEntity } from '../entities';

export abstract class SchedulesRepository {
	abstract getAllByRouteId(
		dto: GetByIdDTO<string>,
		paginationDTO: PaginationDTO
	): Promise<PaginationResponseEntity<ScheduleEntity[]>>;
	abstract getById(dto: GetByIdDTO<number>): Promise<ScheduleEntity>;
	abstract create(dto: CreateScheduleDTO): Promise<ScheduleEntity>;
	abstract update(dto: UpdateScheduleDTO): Promise<ScheduleEntity>;
	abstract delete(dto: GetByIdDTO<number>): Promise<ScheduleEntity>;
}
